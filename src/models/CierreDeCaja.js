const {Schema, model} = require('mongoose');

const CierreDeCajaSchema = new Schema({
    MontoDeApertura:{
        type:Number,
        require:true
    },
    IngresoPorVentasEnEfectivo:{
        type:Number,
        require:true,
    },
    IngresoDeVentasPorTarjetas:{
        type:Number,
        require:true
    }
},{timestamps:true})  

module.exports = model('CierreDeCaja',CierreDeCajaSchema)