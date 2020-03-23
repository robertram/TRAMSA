const {Schema, model} = require('mongoose');

const librosSchema = new Schema({
    titulo:{
        type:String,
        require:true
    },
    autor:{
        type:String,
        require:true,
    },
    anio:{
        type:Number,
        require:true
    }
},{timestamps:true})

module.exports = model('Libro',librosSchema)