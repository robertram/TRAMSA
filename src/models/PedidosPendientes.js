const {Schema, model} = require('mongoose');

const PedidosPendientesSchema = new Schema({
    NumeroPedido:{
        type:Number,
        require:true
    },
    FechaPedido:{
        type:Date,
        require:true,
    }, 
    Proveedor:{
        type:Number,
        require:true
    },
    Camion:{
        type:Number,
        require:true,
    }, 
    MontoDelPedido:{
        type:Number,
        require:true,
    }
},{timestamps:true}) 

module.exports = model('PedidosPendientes',PedidosPendientesSchema)