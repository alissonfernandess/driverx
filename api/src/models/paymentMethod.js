const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const paymentMethod = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cardId: { type: String, required: true},
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mogoose.model('PaymentMethod', paymentMethod);