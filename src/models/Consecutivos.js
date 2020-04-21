const {Schema, model} = require('mongoose');

const ConsecutivosSchema = new Schema({
    Prefijo:{
        type:String,
        require:true
    },
    Descripcion:{
        type:String,
        require:true
    }, 
    ValorConsecutivo:{
        type:Number,
        require:true,
    }, 
    CantidadActual:{
        type:Number,
        require:true,
    }
}) 

module.exports = model('Consecutivos',ConsecutivosSchema)