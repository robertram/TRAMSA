const {
    Router
} = require('express');
const router = Router();

const Parametro = require('../models/Parametrosgenerales');
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
        console.log(newParametro.NombreCompania);
        //req.flash("success_msg", "Parametro Añadido");
        res.redirect("/parametros");
    }
});

router.get('/parametros/edit/:id', async (req, res) => {
    const parametro = await Parametro.findById(req.params.id);

    res.render("parametrosGenerales/edit-parametrosGenerales", {
        parametro
    });
});

router.put('/parametrosGenerales/edit-parametrosGenerales/:id', async (req, res) => {
    const {
        NombreCompania, Telefono, CedulaJuridica, MensajeSaludo, DireccionEstablecimiento
    } = req.body;
    await Parametro.findByIdAndUpdate(req.params.id, {
        NombreCompania, Telefono, CedulaJuridica, MensajeSaludo, DireccionEstablecimiento
    });
    req.flash("success_msg", "Parametro General Editado Exitosamente");
    res.redirect("/parametros");
});

router.delete('/parametros/delete/:id', async (req, res) => {
    await Parametro.findByIdAndDelete(req.params.id);
    const cantidadParametros = await Parametro.find().countDocuments();
    req.flash("success_msg", "Parametro General Eliminado Exitosamente");
    res.redirect("/parametros");
});

module.exports = router;