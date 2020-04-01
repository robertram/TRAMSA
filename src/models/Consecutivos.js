const {Schema, model} = require('mongoose');

const ConsecutivosSchema = new Schema({
    Prefijo:{
        type:String,
        require:true
    },
    ValorConsecutivo:{
        type:String,
        require:true,
    }, 
    Descripción:{
        type:String,
        require:true
    }
},{timestamps:true}) 

module.exports = model('Consecutivos',ConsecutivosSchema)