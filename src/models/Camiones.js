const {Schema, model} = require('mongoose');

const CamionesSchema = new Schema({
    CodigoCamion:{
        type:Number,
        require:true
    },
    Descripcion:{
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
    Anio:{
        type:Number,
        require:true,
    }, 
    Placa:{
        type:String,
        require:true
    }
},{timestamps:true}) 

module.exports = model('Camiones',CamionesSchema)

