const {Schema, model} = require('mongoose');

const CamionesSchema = new Schema({
    CódigoCamión:{
        type:Number,
        require:true
    },
    Descripción:{
        type:String,
        require:true,
    }, 
    NombreCorto:{
        type:String,
        require:true
    }, 
    Marca:{
        type:String,
        require:true
    },
    Año:{
        type:Number,
        require:true,
    }, 
    Placa:{
        type:String,
        require:true
    }, 
    Consecutivo:{
        type:String,
        require:true
    }
},{timestamps:true}) 

module.exports = model('Camiones',CamionesSchema)

