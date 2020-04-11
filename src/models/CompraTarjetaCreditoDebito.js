const {Schema, model} = require('mongoose');

const CompraTarjetaCreditoDebidoSchema = new Schema({
    Num_Tarjeta:{
        type:String,
        require:true
    },
    Mes_Exp:{
        type:String,
        require:true,
    },
    Year_Exp:{
        type:String,
        require:true
    }, 
    CVV:{
        type:String,
        require:true
    }, 
    Monto:{
        type:Number,
        require:true
    }, 
    Tipo:{
        type:Array,
        require:true
    }
},{timestamps:true})  

module.exports = model('CompraTarjetaCreditoDebido',CompraTarjetaCreditoDebidoSchema)