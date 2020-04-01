const {Schema, model} = require('mongoose');

const ProveedorSchema = new Schema({
    CodigoProveedor:{
        type:Number,
        require:true
    },
    Cedula:{
        type:String,
        require:true,
    }, 
    Nombre:{
        type:String,
        require:true
    },
    Telefonos:{
        type:Arrays,
        require:true,
    }, 
    Correo:{
        type:String,
        require:true
    },
    Contacto:{
        type:String,
        require:true,
    }, 
    TelefonoContacto:{
        type:String,
        require:true
    },
    Direccion:{
        type:String,
        require:true,
    }
},{timestamps:true})


module.exports = model('Proveedor',ProveedorSchema)
