const {Schema, model} = require('mongoose');

const PuntoDeVentaSchema = new Schema({
    NumeroFactura:{
        type:Number,
        require:true
    },
    Fecha:{
        type:Date,
        require:true,
    },
    Cliente:{
        type:Number,
        require:true
    }, 
    Producto:{
        type:Number,
        require:true
    }, 
    CantidadProducto:{
        type:Number,
        require:true
    }, 
    Descuento:{
        type:Number,
        require:true
    }, 
    Impuesto:{
        type:Number,
        require:true
    }, 
    Total:{
        type:Number,
        require:true
    }
},{timestamps:true})

module.exports = model('PuntoDeVenta',PuntoDeVentaSchema)