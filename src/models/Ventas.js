const {Schema, model} = require('mongoose');

const VentasSchema = new Schema({
    NumFactura:{
        type:Number,
        require:true
    },
    Fecha:{
        type:Date,
        require:true,
    }, 
    MontoVenta:{
        type:Number,
        require:true
    }
},{timestamps:true})  

module.exports = model('Ventas',VentasSchema)