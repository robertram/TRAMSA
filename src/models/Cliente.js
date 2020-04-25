const {Schema, model} = require('mongoose');

const ClienteSchema = new Schema({
    CodigoIdentificacion:{
        type:Number,
        require:true
    },
    FechaIngreso:{
        type:Date,
        require:true,
    },
    DocumentoDeIdentidad:{
        type:String,
        require:true
    }, 
    PrimerApellido:{
        type:String,
        require:true
    }, 
    SegundoApellido:{
        type:String,
        require:true
    }, 
    Nombre:{
        type:String,
        require:true
    }, 
    Estado:{
        type:String,
        require:true
    }, 
    Telefono:{
        type:Number,
        require:true
    }, 
    CorreoElectronico:{
        type:String,
        require:true
    }, 
    Direccion:{
        type:String,
        require:true
    }, 
    Consecutivo:{
        type:String,
        require:true
    }
},{timestamps:true})

  
module.exports = model('Cliente',ClienteSchema)

