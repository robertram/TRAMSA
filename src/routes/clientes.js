const {Router} = require('express');
const router = Router();

const Cliente = require('../models/Cliente');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');


router.get('/clientes', isAuthenticated, async (req, res) => {
    const clientes = await Cliente.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('clientes/new-cliente', {
        clientes
    });
});

router.post('/clientes/new-cliente', isAuthenticated, async (req, res) => {
    const {
        CodigoIdentificacion,
        FechaIngreso, 
        DocumentoDeIdentidad, 
        PrimerApellido, 
        SegundoApellido, 
        Nombre, 
        Estado,Telefono, 
        CorreoElectronico, 
        Direccion} = req.body;
    const errors = [];
    //Chequeo si está vacío el textbox
    
    if (!CodigoIdentificacion) {
        errors.push({
            text: "Escribe CodigoIdentificacion"
        });
    }
    if (!FechaIngreso) {
        errors.push({
            text: "Escribe FechaIngreso."
        });
    }
    if (!DocumentoDeIdentidad) {
        errors.push({
            text: "Escribe DocumentoDeIdentidad."
        });
    }
    if (!PrimerApellido) {
        errors.push({
            text: "Escribe PrimerApellido."
        });
    }
    if (!SegundoApellido) {
        errors.push({
            text: "Escribe SegundoApellido."
        });
    }
    if (!Nombre) {
        errors.push({
            text: "Escribe Nombre."
        });
    }
    if (!Estado) {
        errors.push({
            text: "Escribe Estado."
        });
    }
    if (!Telefono) {
        errors.push({
            text: "Escribe Telefono."
        });
    }
    if (!CorreoElectronico) {
        errors.push({
            text: "Escribe CorreoElectronico."
        });
    }
    if (!Direccion) {
        errors.push({
            text: "Escribe Direccion."
        });
    }

    if (errors.length > 0) {
        res.render("clientes/new-cliente", {
            errors, //No se quita
            CodigoIdentificacion,
            FechaIngreso, 
            DocumentoDeIdentidad, 
            PrimerApellido, 
            SegundoApellido, 
            Nombre, 
            Estado,Telefono, 
            CorreoElectronico, 
            Direccion
        });
    } else {
        const cantidadClientes = await Cliente.find().countDocuments();
        
        const newCliente = new Cliente({
            CodigoIdentificacion,
            FechaIngreso, 
            DocumentoDeIdentidad, 
            PrimerApellido, 
            SegundoApellido, 
            Nombre, 
            Estado,Telefono, 
            CorreoElectronico, 
            Direccion
        });

        console.log('Aqui comienza el consecutivo');
        await Consecutivo.findOne({"Prefijo":"CL"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                console.log('Aqui se despicha 1 ');
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                Consecutivo.updateOne({Prefijo:"CL"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        newCliente.Consecutivo = a;
                        newCliente.save();
                    }
                })
            }
        });
        console.log('Aqui comienza el segundo consecutivo');
        await Consecutivo.findOne({"Prefijo":"CL"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                console.log('Aqui se despicha 2 ');
                return next(err);
            }else{
                var cant = cantidadClientes+1;
                Consecutivo.updateOne({Prefijo:"CL"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }
                })
            }
        });
        req.flash("success_msg", "Cliente Añadido");
        res.redirect("/clientes");
    }
});

router.get('/clientes/edit/:id', isAuthenticated, async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);

    res.render("clientes/edit-cliente", {
        cliente
    });
});

router.put('/clientes/edit-cliente/:id', isAuthenticated, async (req, res) => {
    const {
        CodigoIdentificacion,
        FechaIngreso, 
        DocumentoDeIdentidad, 
        PrimerApellido, 
        SegundoApellido, 
        Nombre, 
        Estado,Telefono, 
        CorreoElectronico, 
        Direccion
    } = req.body;
    await Cliente.findByIdAndUpdate(req.params.id, {
        CodigoIdentificacion,
        FechaIngreso, 
        DocumentoDeIdentidad, 
        PrimerApellido, 
        SegundoApellido, 
        Nombre, 
        Estado,Telefono, 
        CorreoElectronico, 
        Direccion
    });
    req.flash("success_msg", "Cliente Editado Exitosamente");
    res.redirect("/clientes");
});

router.delete('/clientes/delete/:id', isAuthenticated, async (req, res) => {
    await Cliente.findByIdAndDelete(req.params.id);
    const cantidadClientes = await Cliente.find().countDocuments();
    await Consecutivo.findOne({"Prefijo":"CL"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadClientes;
            Consecutivo.updateOne({Prefijo:"CL"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Cliente Eliminado Exitosamente");
    res.redirect("/clientes");
});

module.exports = router;