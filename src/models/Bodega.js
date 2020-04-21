const {Schema, model} = require('mongoose');

const BodegaSchema = new Schema({
    CodigoBodega:{
        type:Number,
        require:true
    },
    Nombre:{
        type:String,
        require:true,
    }, 
    NombreCorto:{
        type:String,
        require:true
    }, 
    Alias:{
        type:String,
        require:true
    },
    Ubicacion:{
        type:String,
        require:true,
    }, 
    UnidadMedida:{
        type:String,
        require:true
    }, 
    TipoBodega:{
        type:String,
        require:true
    },
    EspacioBodega:{
        type:Number,
        require:true,
    }
},{timestamps:true})   

module.exports = model('Bodega',BodegaSchema)

