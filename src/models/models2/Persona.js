const {
    Schema,
    model
} = require('mongoose');

const PersonaSchema = new Schema({
    dni: Number,
    nombre: String,
    direccion: String,
    Socio: [{type: Schema.Types.ObjectId, ref:'socio'}]
})

module.exports = model('Persona', PersonaSchema)