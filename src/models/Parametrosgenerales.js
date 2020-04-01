const {Schema, model} = require('mongoose');

const ParametrosGeneralesSchema = new Schema({
    NombreCompañía:{
        type:String,
        require:true
    },
    Teléfono:{
        type:String,
        require:true,
    }, 
    CédulaJurídica:{
        type:String,
        require:true
    },
    MensajeSaludo:{
        type:String,
        require:true,
    }, 
    DirecciónEstablecimiento:{
        type:String,
        require:true
    }
},{timestamps:true})  

module.exports = model('ParametrosGenerales',ParametrosGeneralesSchema)
    