const mongoose = require('mongoose');

var productosSchema = new mongoose.Schema({
    CodigoProducto: {
        type:String, 
        required:true
    },
    CódigoMateriaPrima: {
        type:String, 
        required:true
    },Descripcion: {
        type:String, 
        required:true
    },PuntoReOrden: {
        type:String, 
        required:true
    },
    UnidadMedida: {
        type:String, 
        required:true
    },
    Consecutivos: {
        type:String, 
        required:true
    }
});

module.exports= mongoose.model('productos', productosSchema);