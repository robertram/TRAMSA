const {Schema, model} = require('mongoose');

const RolesSchema = new Schema({
    Codigo:{
        type:Number,
        require:true
    },
    Nombre:{
        type:String,
        require:true,
    }, 
    RolesDisponibles:{
        type:Array,
        require:true
    },
    RolesAsignados:{
        type:Array,
        require:true,
    }
},{timestamps:true})  

module.exports = model('Roles',RolesSchema)