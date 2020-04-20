const {
    Router
} = require('express');
const router = Router();

const Consecutivo = require('../models/Consecutivos');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/consecutivos', async(req, res) => {
    const consecutivos = await Consecutivo.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('consecutivos/new-consecutivo', {
        consecutivos
    });
});

//-----------Editar consecutivo------------------
/*
router.get('/consecutivos/edit/:id', async (req, res) => {
    const consecutivo = await Consecutivo.findById(req.params.id);

    res.send(
        consecutivo
    );
});

router.put('/consecutivos/edit-consecutivo/:id', async (req, res) => {
    const ValorConsecutivo= 0;
    await Producto.findByIdAndUpdate(req.params.id, {
        ValorConsecutivo
    });
    req.flash("success_msg", "Consecutivo Editado Exitosamente");
    res.redirect("/Consecutivo");
});*/

/*
router.post('/consecutivos/new-consecutivo',  async (req, res) => {
    const {
        Prefijo,
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
            Descripcion
        });
    } else {

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
});*/

module.exports = router;