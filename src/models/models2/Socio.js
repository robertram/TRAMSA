const {
    Schema,
    model
} = require('mongoose');

const SocioSchema = new Schema({
    dnisocio: Number
})


module.exports = model('Socio', SocioSchema)