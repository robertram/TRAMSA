const {
    Router
} = require('express');
const router = Router();

const Camion = require('../models/Camiones');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/camiones', isAuthenticated, async(req, res) => {
    const camiones = await Camion.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('camiones/new-camion', {
        camiones
    });
});

router.post('/camiones/new-camion', isAuthenticated, async (req, res) => {
    const {
        CodigoCamion,
        Descripcion,
        NombreCorto,
        Marca,
        Año,
        Placa,
        Consecutivo
    } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!CodigoCamion) {
        errors.push({
            text: "Please Write a CodigoCamion."
        });
    }
    if (!Descripcion) {
        errors.push({
            text: "Please Write a Descripcion"
        });
    }
    if (!NombreCorto) {
        errors.push({
            text: "Please Write a NombreCorto."
        });
    }
    if (!Marca) {
        errors.push({
            text: "Please Write a Marca"
        });
    }

    if (!Año) {
        errors.push({
            text: "Please Write a year"
        });
    }

    if (!Placa) {
        errors.push({
            text: "Please Write a Placa"
        });
    }

    if (errors.length > 0) {
        res.render("camiones/new-Camion", {
            errors, //No se quita
            CodigoCamion,
            Descripcion,
            NombreCorto,
            Marca,
            Año,
            Placa,
            Consecutivo
        });
    } else {
        const cantidadCamiones = await Camion.find().countDocuments();
        console.log(cantidadCamiones);

        const newCamion = new Camion({
            CodigoCamion,
            Descripcion,
            NombreCorto,
            Marca,
            Año,
            Placa
        });
        //newCamion.user = req.user.id;
        newCamion.CodigoCamion = cantidadCamiones+1;
        newCamion.Consecutivo = cantidadCamiones+1;
        await newCamion.save();
        //req.flash("success_msg", "Camion Añadido");
        res.redirect("/camiones");
    }
});

module.exports = router;