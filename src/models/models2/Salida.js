const {
    Schema,
    model
} = require('mongoose');


const SalidaSchema = new Schema({
    matriculaSalida: Number,
    fecha: String,
    hora: String, //Date
    destino: String, 
    dnipatronSalida: Number
})



module.exports = model('Salida', SalidaSchema)