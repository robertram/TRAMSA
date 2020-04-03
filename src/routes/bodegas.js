const {
    Router
} = require('express');
const router = Router();

const Bodega = require('../models/Bodega');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/bodegas', isAuthenticated, async(req, res) => {
    const bodegas = await Bodega.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('bodegas/new-bodega', {
        bodegas
    });
});

router.post('/bodegas/new-bodega', isAuthenticated, async (req, res) => {
    const {
        CodigoBodega,
        Nombre,
        NombreCorto,
        Alias,
        Ubicacion,
        UnidadMedida,
        TipoBodega,
        EspacioBodega,
        Consecutivo
    } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!CodigoBodega) {
        errors.push({
            text: "Please Write a CodigoBodega."
        });
    }
    if (!Nombre) {
        errors.push({
            text: "Please Write a Nombre"
        });
    }
    if (!NombreCorto) {
        errors.push({
            text: "Please Write a NombreCorto."
        });
    }
    if (!Alias) {
        errors.push({
            text: "Please Write a Alias"
        });
    }

    if (!Ubicacion) {
        errors.push({
            text: "Please Write a Ubicacion"
        });
    }

    if (!UnidadMedida) {
        errors.push({
            text: "Please Write a UnidadMedida"
        });
    }

    if (!TipoBodega) {
        errors.push({
            text: "Please Write a TipoBodega"
        });
    }

    if (!EspacioBodega) {
        errors.push({
            text: "Please Write a EspacioBodega"
        });
    }

    if (errors.length > 0) {
        res.render("bodegas/new-bodega", {
            errors, //No se quita
            CodigoBodega,
            Nombre,
            NombreCorto,
            Alias,
            Ubicacion,
            UnidadMedida,
            TipoBodega,
            EspacioBodega,
            Consecutivo
        });
    } else {
        const cantidadBodegas = await Bodega.find().countDocuments();
        console.log(cantidadBodegas);

        const newBodega = new Bodega({
            CodigoBodega,
            Nombre,
            NombreCorto,
            Alias,
            Ubicacion,
            UnidadMedida,
            TipoBodega,
            EspacioBodega,
            Consecutivo
        });
        //newBodega.user = req.user.id;
        newBodega.CodigoBodega = cantidadBodegas+1;
        newBodega.Consecutivo = cantidadBodegas+1;
        await newBodega.save();
        //req.flash("success_msg", "bodega Añadido");
        res.redirect("/bodegas");
    }
});

module.exports = router;