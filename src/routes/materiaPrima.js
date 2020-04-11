const {
    Router
} = require('express');
const router = Router();

const MateriaPrima = require('../models/MateriaPrima');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/materiaPrima', isAuthenticated, async(req, res) => {
    const materiaPrima = await MateriaPrima.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('materiaPrima/new-materiaPrima', {
        materiaPrima
    });
});

router.post('/materiaPrima/new-materiaPrima', isAuthenticated, async (req, res) => {
    const {
        CodigoMateriaPrima,
        Nombre,
        CantidadExistente,
        UnidadDeMedida,
        Consecutivo
    } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!CodigoMateriaPrima) {
        errors.push({
            text: "Please Write a CodigoMateriaPrima."
        });
    }
    if (!Nombre) {
        errors.push({
            text: "Please Write a Nombre"
        });
    }
    if (!CantidadExistente) {
        errors.push({
            text: "Please Write a CantidadExistente."
        });
    }
    if (!UnidadDeMedida) {
        errors.push({
            text: "Please Write a UnidadDeMedida"
        });
    }

    if (errors.length > 0) {
        res.render("materiaPrima/new-materiaPrima", {
            errors, //No se quita
            CodigoMateriaPrima,
            Nombre,
            CantidadExistente,
            UnidadDeMedida,
            Consecutivo
        });
    } else {
        const cantidadMateriaPrima = await MateriaPrima.find().countDocuments();
        console.log(cantidadMateriaPrima);

        const newMateriaPrima = new MateriaPrima({
            CodigoMateriaPrima,
            Nombre,
            CantidadExistente,
            UnidadDeMedida
        });
        //newMateriaPrima.user = req.user.id;
        newMateriaPrima.CodigoMateriaPrima = cantidadMateriaPrima+1;
        newMateriaPrima.Consecutivo = cantidadMateriaPrima+1;
        await newMateriaPrima.save();
        //req.flash("success_msg", "MateriaPrima Añadido");
        res.redirect("/materiaPrima");
    }
});

module.exports = router;