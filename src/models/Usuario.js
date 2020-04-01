const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    Nombre:{
        type:String,
        require:true
    },
    Usuario:{
        type:String,
        require:true,
    },
    Contraseña:{
        type:String,
        require:true
    }, 
    Email:{
        type:String,
        require:true
    },
    Rol:{
        type:Number,
        require:true
    },  
    Estado:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = model('Usuario',UsuarioSchema)