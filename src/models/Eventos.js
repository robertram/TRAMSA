const {Schema, model} = require('mongoose');

const EventosSchema = new Schema({
    Codigo:{
        type:Number,
        require:true
    },
    Descripcion:{
        type:String,
        require:true,
    }
},{timestamps:true})  

module.exports = model('Eventos',EventosSchema)
