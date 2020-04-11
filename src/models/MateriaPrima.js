const {Schema, model} = require('mongoose');

const MateriaPrimaSchema = new Schema({
    CodigoMateriaPrima:{
        type:Number,
        require:true
    },
    Nombre:{
        type:String,
        require:true,
    },
    CantidadExistente:{
        type:Number,
        require:true
    }, 
    UnidadDeMedida:{
        type:Array,
        require:true
    }
},{timestamps:true})

module.exports = model('MateriaPrima',MateriaPrimaSchema)

