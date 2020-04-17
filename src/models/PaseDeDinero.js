const {Schema, model} = require('mongoose');

const PaseDineroSchema = new Schema({
    Fecha:{
        type:Date,
        require:true
    },
    Indicador:{
        type:String,
        require:true,
    }, 
    Monto:{
        type:Number,
        require:true
    }
},{timestamps:true})  

module.exports = model('PaseDeDinero',PaseDineroSchema)