const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const car = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    placa: {type: String, required: true},
    marca: {type: String, required: true},
    modelo: {type: String, required: true},
    cor: {type: String, required: true},
    dataCadastro: {
      type: Date,
      default: Date.now()
    },
});

module.exports = mongoose.model('Car', car );