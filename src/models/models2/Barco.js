const {
    Schema,
    model
} = require('mongoose');

const BarcoSchema = new Schema({
    dnisocio: Number,
    matriculaSalida: Number,
    nombreBarco: String,
    amarre: String,
    cuota: String
})

module.exports = model('Barco', BarcoSchema)