const {Schema, model} = require('mongoose');

const BitacoraSchema = new Schema({
    Usuario:{
        type:Number,
        require:true
    },
    Fecha:{
        type:Date,
        require:true,
    }, 
    CodigoRegistro:{
        type:Number,
        require:true
    },
    DescripcionAccion:{
        type:Number,
        require:true,
    }
},{timestamps:true}) 

module.exports = model('Bitacora',BitacoraSchema)