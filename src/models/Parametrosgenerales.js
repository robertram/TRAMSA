const {Schema, model} = require('mongoose');

const ParametrosGeneralesSchema = new Schema({
    NombreCompania:{
        type:String,
        require:true
    },
    Telefono:{
        type:Number,
        require:true,
    }, 
    CedulaJuridica:{
        type:Number,
        require:true
    },
    MensajeSaludo:{
        type:String,
        require:true,
    }, 
    DireccionEstablecimiento:{
        type:String,
        require:true
    }
},{timestamps:true})  

module.exports = model('ParametrosGenerales',ParametrosGeneralesSchema)
    