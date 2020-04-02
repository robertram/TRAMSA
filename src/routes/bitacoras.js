const {
    Router
} = require('express');
const router = Router();

const Bitacora = require('../models/Bitacora');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/bitacora', isAuthenticated, async (req, res) => {
    const bitacoras = await Bitacora.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('bitacoras/new-bitacora', {
        bitacoras
    });
});

router.post('/bitacoras/new-bitacora', isAuthenticated, async (req, res) => {
    const {
        Usuario,
        Fecha,
        CodigoRegistro,
        DescripcionAccion
    } = req.body;

    const errors = [];
    //Chequeo si está vacío el textbox
    if (!Usuario) {
        errors.push({
            text: "Por favor escribe un Usuario."
        });
    }
    if (!Fecha) {
        errors.push({
            text: "Por favor escribe una Fecha"
        });
    }
    if (!CodigoRegistro) {
        errors.push({
            text: "Por favor escribe un Codigo Registro."
        });
    }
    if (!DescripcionAccion) {
        errors.push({
            text: "Por favor escribe una Descripcion de Accion"
        });
    }

    if (errors.length > 0) {
        res.render("bitacoras/new-bitacora", {
            errors,
            Usuario,
            Fecha,
            CodigoRegistro,
            DescripcionAccion
        });
    } else {
        const newBitacora = new Bitacora({
            Usuario,
            Fecha,
            CodigoRegistro,
            DescripcionAccion
        });
        //newProducto.user = req.user.id;
        await newBitacora.save();
        //req.flash("success_msg", "Producto Añadido");
        res.redirect("/bitacoras");
    }
});

module.exports = router;

/*Usuario:{
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
}*/