const {
    Router
} = require('express');
const router = Router();

const Evento = require('../models/Eventos');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/eventos', isAuthenticated, async(req, res) => {
    const eventos = await Evento.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('eventos/new-evento', {
        eventos
    });
});

router.post('/eventos/new-evento', isAuthenticated, async (req, res) => {
    const {
        Codigo,
        Descripcion
    } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!Codigo) {
        errors.push({
            text: "Please Write a Codigo."
        });
    }
    if (!Descripcion) {
        errors.push({
            text: "Please Write a Descripcion"
        });
    }

    if (errors.length > 0) {
        res.render("eventos/new-evento", {
            errors, //No se quita
            Codigo,
            Descripcion
        });
    } else {
        const cantidadEventos = await Evento.find().countDocuments();
        console.log(cantidadEventos);

        const newEvento = new Evento({
            Codigo,
            Descripcion
        });
        //newEvento.user = req.user.id;
        newEvento.Codigo = cantidadEventos+1;
        newEvento.Consecutivo = cantidadEventos+1;
        await newEvento.save();
        //req.flash("success_msg", "Evento Añadido");
        res.redirect("/eventos");
    }
});

module.exports = router;