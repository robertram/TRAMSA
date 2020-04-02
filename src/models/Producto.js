const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
    CodigoMateriaPrima:{
        type:Number,
        require:true
    },
    Descripcion:{
        type:String,
        require:true,
    },
    PuntosReOrden:{
        type:String, //Arrays
        require:true
    }, 
    UnidadDeMedida:{
        type:String, //Arrays
        require:true
    }, 
    CodigoProducto:{
        type:Number,
        require:true
    }
},{timestamps:true})

module.exports = model('Producto',ProductoSchema)