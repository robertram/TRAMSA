const {Schema, model} = require('mongoose');

const BodegaSchema = new Schema({
    CódigoBodega:{
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
    Ubicación:{
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
    }, 
    Consecutivo:{
        type:String,
        require:true
    }
},{timestamps:true})   

module.exports = model('Bodega',BodegaSchema)

