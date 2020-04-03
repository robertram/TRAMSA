const {
    Router
} = require('express');
const router = Router();

const Parametro = require('../models/Producto');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/parametros', isAuthenticated, async(req, res) => {
    const parametros = await Parametro.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('parametrosGenerales/new-parametroGeneral', {
        parametros
    });
});

router.post('/parametrosGenerales/new-parametroGeneral', isAuthenticated, async (req, res) => {
    const {
        NombreCompania,
        Telefono,
        CedulaJuridica,
        MensajeSaludo,
        DireccionEstablecimiento
    } = req.body;

    const errors = [];
    //Chequeo si está vacío el textbox
    if (!NombreCompania) {
        errors.push({
            text: "Please Write a NombreCompania."
        });
    }
    if (!Telefono) {
        errors.push({
            text: "Please Write a Telefono"
        });
    }
    if (!CedulaJuridica) {
        errors.push({
            text: "Please Write a CedulaJuridica."
        });
    }
    if (!MensajeSaludo) {
        errors.push({
            text: "Please Write a MensajeSaludo"
        });
    }

    if (!DireccionEstablecimiento) {
        errors.push({
            text: "Please Write a DireccionEstablecimiento"
        });
    }

    if (errors.length > 0) {
        res.render("parametrosGenerales/new-parametroGeneral", {
            errors, //No se quita
            NombreCompania,
            Telefono,
            CedulaJuridica,
            MensajeSaludo,
            DireccionEstablecimiento
        });
    } else {
        const cantidadParametros = await Parametro.find().countDocuments();
        console.log(cantidadParametros);

        const newParametro = new Parametro({
            NombreCompania,
            Telefono,
            CedulaJuridica,
            MensajeSaludo,
            DireccionEstablecimiento
        });
        newParametro.CodigoParametro= cantidadParametros+1;
        //newParametro.user = req.user.id;
        await newParametro.save();
        //req.flash("success_msg", "Parametro Añadido");
        res.redirect("/parametros");
    }
});


module.exports = router;