const {Schema, model} = require('mongoose');

const TipoMateriaPrimaSchema = new Schema({
    CodigoTipoMateriaPrima:{
        type:Number,
        require:true
    },
    Descripcion:{
        type:String,
        require:true,
    }
},{timestamps:true})

module.exports = model('TipoMateriaPrima',TipoMateriaPrimaSchema)