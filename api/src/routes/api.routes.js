const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');
const Car = require('../models/car');
const PaymentMethod = require('../models/paymentMethod');
const Ride = require('../models/ride');

const pagarme = require('../services/pagarme');
const googleMaps = require('../services/googleMaps');
const keys = require('../utils/keys.json');

// criar usuário
router.post('/signup', async (req, res) => {
  // conectando ao banco usando replicas
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();

  try {
    const {user, car, paymentMethod} = req.body;
    
    let finalUser = {};

    if (user.tipo === 'M') {
      // CADASTRAR RECEBEDOR
      const createRecipient =  await pagarme.createCreditCard({
        name: user.nome,
        email: user.email,
      })

      if (createRecipient.error) {
        throw createRecipient.message;
      }

      // CADASTRAR MOTORISTA
      finalUser = await new User({
        ...user,
        recipientId: createRecipient.data.id,
      }).save({ session });

      // CADASTRAR VEÍCULO
      await new Car({...car, userId: finalUser._id}).save({session});
    } else {
      // CADASTRAR PASSAGEIRO
      finalUser = await new User(user).save({session});

      // CRIAR CARTÃO DE CRÉDITO
      const createCreditCard = await pagarme.createCreditCard({
        card_expiration_date: paymentMethod.validade.replace('/', ''), // 12/2023 => 122023
        card_number: paymentMethod.numero.replace(' ', ''),
        card_cvv: paymentMethod.cvv,
        card_holder_name: paymentMethod.nome,
      });

      if (createCreditCard.error) {
        throw createCreditCard.message;
      }

      // CADASTRAR CARTÃO DE CRÉDITO
      await new PaymentMethod({
        cardId: createCreditCard.data.id,
        userId: finalUser._id,
      }).save({session});
    }

    await session.commitTransaction();
    session.endSession();

    res.json({error: false, user: finalUser});
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({error: true, message: err.message});
  }
});

// verificar se contém usuário
router.post('/check-user', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    res.json({error: false, user});
  } catch (err) {
    res.json({error: true, message: err.message});
  }
});

// atualização localização
router.put('/location/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {coordinates} = req.body;

    await User.findByIdAndUpdate(id, {
      localiton: {
        type: 'Point',
        coordinates,
      }
    });

    res.json({error: false})
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// atualização socket usuário
router.put('/socket/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { socketId } = req.body;

    await User.findByIdAndUpdate(id, {
      socketId,
    });

    res.json({ error: false });
  }catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// pegar os endereços
router.get('/address/:address', async (req, res) => {
  try {
    const list = await googleMaps.getPlaces(
      encodeURIComponent(req.params.address)
    );
  
    if (list.error) {
      throw list.message;
    }
  
    const addressList = list.data.predictions.map((addr) => {
      const {
        place_id,
        description,
        structured_formatting: { secondary_text },
      } = addr;
  
      return { place_id, description, secondary_text};
    });

    res.json({error: false, list: addressList});
  } catch (err) {
    res.json({error: true, message: err.message});
  }

});

// exibindo distância e valor da corrida
router.post('/pre-ride', async (req, res) => {
  try {
    const {origin, destination} = req.body;

    const routeRequest = await googleMaps.getRoutess(origin, destination);

    if (routeRequest.error) {
      throw routeRequest.message;
    }

    const { 
      distance,
      duration,
      star_address,
      end_address,
      steps,
    } = routeRequest.data.routes[0].legs[0];

    const route = steps.map((step) => {
      return [
        {
          latitude: step.start_location.lat,
          longitude: step.start_location.lng,
        },
        {
          latitude: step.end_location.lat,
          longitude: step.end_location.lng,
        },
      ]
    }).flat(1);

    const price = ((distance.value / 1000) * 2.67).toFixed(2);

    res.json({
      error: false,
      info: { distance, duration, start_address, end_address, route, price },
    });
  } catch (err) {
    res.json({error: true, message: err.message});
  }
})


module.exports = router;