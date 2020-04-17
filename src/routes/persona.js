const {
    Router
} = require('express');
const router = Router();

const Persona = require('../models/models2/Persona');
const Socio = require('../models/models2/Socio');
const Patron = require('../models/models2/Patron');
const Barco = require('../models/models2/Barco');
const Salida = require('../models/models2/Salida');

router.get('/personas', async (req, res) => {
    const personas = await Persona.find();
    const socio = await Socio.find();
    const patron = await Patron.find();
    const barco = await Barco.find();
    const salida = await Salida.find();

    res.render('personas/new-persona', {
        personas, socio, patron, barco, salida
    });
});

router.get('/personas-data', async (req, res) => {
    const personas = await Persona.find();
    res.send({
        personas
    });
});

router.post('/personas/new-persona', async (req, res) => {
    //Persona
    const {
        dni,
        nombre,
        direccion
    } = req.body;

    //Socio
    let socio = req.body.socio;

    //Patron
    let patron = req.body.patron;

    //Barco
    const {
        //dnisocio,
        matricula,
        nombreBarco,
        amarre,
        cuota
    } = req.body;

    //Salida
    const {
        matriculaSalida,
        fecha,
        hora,
        destino,
        dnipatron
    } = req.body;

    const errors = [];

    if (errors.length > 0) {
        res.render("personas/new-persona", {
            errors,
            dni,
            nombre,
            direccion
        });
    } else {

        if (Object.keys(req.body.dni).length === 0) {
            console.log('No hay persona ', req.body.dni)
        } else {
            const newPersona = new Persona({
                dni,
                nombre,
                direccion
                /*,
                Patron: [dd], 
                Barco: [matricula, dni, nombre, amarre, cuota], 
                Salida: [matricula, fecha, hora, destino, dni]*/
            });
            
            await newPersona.save();
        }
        

        if (socio == 'yes') {
            const newSocio = new Socio({
                dnisocio: dni
            });

            await newSocio.save();
        }

        if (patron == 'yes') {
            const newPatron = new Patron({
                dnipatron: dni
            });

            await newPatron.save();
        }

        if (Object.keys(req.body.matricula).length === 0) {
            console.log('No hay barco ', req.body.matricula)
        } else {
            let dnisocio = dni;
            const newBarco = new Barco({
                dnisocio,
                matricula,
                nombreBarco,
                amarre,
                cuota
            });
            console.log('new barco ', newBarco);
            await newBarco.save();
        }

        //Salida
        if (Object.keys(req.body.fecha).length === 0) {
            console.log('No hay salida ', req.body.fecha)
        } else {
            
            let dnipatronSalida = dni;
            let matriculaSalida = matricula;
            console.log('patron ', dnipatronSalida, 'matricula ', matriculaSalida);
            const newSalida = new Salida({
                matriculaSalida,
                fecha,
                hora,
                destino,
                dnipatronSalida
            });
            console.log('new salida ', newSalida);
            await newSalida.save();
        }
        
        //req.flash("success_msg", "Producto Añadido");
        res.redirect("/personas");
    }
});

router.get('/productos/edit/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    /*if (producto.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }*/
    res.render("productos/edit-producto", {
        producto
    });
});

router.put('/productos/edit-producto/:id', async (req, res) => {
    const {
        CodigoMateriaPrima,
        Descripcion,
        PuntosReOrden,
        UnidadDeMedida
    } = req.body;
    await Producto.findByIdAndUpdate(req.params.id, {
        CodigoMateriaPrima,
        Descripcion,
        PuntosReOrden,
        UnidadDeMedida
    });
    req.flash("success_msg", "Producto Editado Exitosamente");
    res.redirect("/productos");
});

router.delete('/productos/delete/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Producto Eliminado Exitosamente");
    res.redirect("/productos");
});




module.exports = router;