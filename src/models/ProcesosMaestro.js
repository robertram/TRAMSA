const {Schema, model} = require('mongoose');

const ProcesoMaestroSchema = new Schema({
    OrdenPedido:{
        type:Number,
        require:true
    },
    FechaOrden:{
        type:Date,
        require:true,
    },
    Proveedor:{
        type:Number,
        require:true
    }, 
    Comprobante:{
        type:Array,
        require:true
    }
},{timestamps:true})

module.exports = model('ProcesoMaestro',ProcesoMaestroSchema)