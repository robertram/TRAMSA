const {
    Schema,
    model
} = require('mongoose');

const PatronSchema = new Schema({
    dnipatron: Number
})

module.exports = model('Patron', PatronSchema)