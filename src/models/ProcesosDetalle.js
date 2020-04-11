const {Schema, model} = require('mongoose');

const ProcesoDetalleSchema = new Schema({
    CodigoOrdenPedido:{
        type:Number,
        require:true
    },
    CodigoMateriaPrima:{
        type:Number,
        require:true,
    },
    NombreMateriaPrima:{
        type:String,
        require:true
    }, 
    CantidadAPedir:{
        type:Number,
        require:true
    }, 
    Estado:{
        type:Array,
        require:true
    }
},{timestamps:true})

module.exports = model('ProcesoDetalle',ProcesoDetalleSchema)