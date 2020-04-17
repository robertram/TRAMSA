const {Schema, model} = require('mongoose');

const ProduccionEnLoteSchema = new Schema({
    NumeroProduccion:{
        type:Number,
        require:true
    },
    FechaProduccion:{
        type:Date,
        require:true,
    },
    CodigoProducto:{
        type:Number,
        require:true
    }, 
    Producto:{
        type:String,
        require:true
    }, 
    Bodega:{
        type:Number,
        require:true
    }, 
    Cantidad:{
        type:Number,
        require:true
    }, 
    TiempoProduccion:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = model('ProduccionEnLote',ProduccionEnLoteSchema)