const {
    Router
} = require('express');
const router = Router();

const Consecutivo = require('../models/Consecutivos');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/consecutivos', isAuthenticated, async(req, res) => {
    const consecutivos = await Consecutivo.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('consecutivos/new-consecutivo', {
        consecutivos
    });
});

router.post('/consecutivos/new-consecutivo', isAuthenticated, async (req, res) => {
    const {
        Prefijo,
        ValorConsecutivo,
        Descripcion
    } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!Prefijo) {
        errors.push({
            text: "Please Write a Prefijo."
        });
    }
    if (!ValorConsecutivo) {
        errors.push({
            text: "Please Write a ValorConsecutivo"
        });
    }
    if (!Descripcion) {
        errors.push({
            text: "Please Write a Descripcion."
        });
    }

    if (errors.length > 0) {
        res.render("consecutivos/new-consecutivo", {
            errors, //No se quita
            Prefijo,
            ValorConsecutivo,
            Descripcion
        });
    } else {
        const cantidadConsecutivos = await Consecutivo.find().countDocuments();
        console.log(cantidadConsecutivos);

        const newConsecutivo = new Consecutivo({
            Prefijo,
            ValorConsecutivo,
            Descripcion
        });
        //newConsecutivo.user = req.user.id;
        newConsecutivo.ValorConsecutivo = cantidadConsecutivos+1;
        await newConsecutivo.save();
        //req.flash("success_msg", "Consecutivo Añadido");
        res.redirect("/consecutivos");
    }
});

module.exports = router;