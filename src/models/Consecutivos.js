const {Schema, model} = require('mongoose');

const ConsecutivosSchema = new Schema({
    Prefijo:{
        type:String,
        require:true
    },
    ValorConsecutivo:{
        type:Number,
        require:true,
    }, 
    Descripcion:{
        type:String,
        require:true
    }
},{timestamps:true}) 

const consecutivo={
    Prejio: "PRO", 
    Descripcion: "Productos", 
    Valor: 50
}

module.exports = model('Consecutivos',ConsecutivosSchema)