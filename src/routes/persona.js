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

router.get('/socios-data', async (req, res) => {
    const socio = await Socio.find();
    res.send({
        socio
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

router.get('/personas/edit/:id', async (req, res) => {
    //const producto = await Producto.findById(req.params.id);
    const personas = await Persona.findById(req.params.id);
    const socio = await Socio.findById(req.params.id);
    const patron = await Patron.findById(req.params.id);
    const barco = await Barco.findById(req.params.id);
    const salida = await Salida.findById(req.params.id);

    res.render('personas/edit-persona', {
        personas, socio, patron, barco, salida
    });
});

router.put('/personas/edit-persona/:id', async (req, res) => {
    const {
        dni,
        nombre,
        direccion
    } = req.body;
    console.log('Objeto', dni, nombre, direccion);
    await Persona.findByIdAndUpdate(req.params.id, {
        dni,
        nombre,
        direccion
    });

    /*
                Barco

                dnisocio,
                matricula,
                nombreBarco,
                amarre,
                cuota

                Salida

                matriculaSalida,
                fecha,
                hora,
                destino,
                dnipatronSalida
    */
    req.flash("success_msg", "Persona Editada Exitosamente");
    res.redirect("/personas");
});
//Persona
router.delete('/personas/delete/:id', async (req, res) => {
    await Persona.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Persona Eliminada Exitosamente");
    res.redirect("/personas");
});

//Socio
router.delete('/socio/delete/:id', async (req, res) => {
    await Socio.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Socio Eliminado Exitosamente");
    res.redirect("/personas");
});
//Patron
router.delete('/patron/delete/:id', async (req, res) => {
    await Patron.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Patron Eliminado Exitosamente");
    res.redirect("/personas");
});

//Barco
router.delete('/barco/delete/:id', async (req, res) => {
    await Barco.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Socio Eliminado Exitosamente");
    res.redirect("/personas");
});

//Salida
router.delete('/salida/delete/:id', async (req, res) => {
    await Salida.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Salida Eliminada Exitosamente");
    res.redirect("/personas");
});




module.exports = router;