const {
    Router
} = require('express');
const router = Router();

const Camiones = require('../models/Camiones');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/camiones', async (req, res) => {
    const camiones = await Camiones.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('camiones/new-camiones', {
        camiones   
    });
});

router.post('/camiones/new-camiones', async (req, res) => {
    const {
        //CodigoCamion,
        Descripcion,
        NombreCorto,
        Marca,
        Anio,
        Placa
    } = req.body;

    const CodigoCamion = 1;
    const errors = [];
    //Chequeo si está vacío el textbox
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

    if (!Anio) {
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
        res.render("camiones/new-camiones", {
            errors, //No se quita
            Descripcion,
            NombreCorto,
            Marca,
            Anio,
            Placa
        });
    } else {
        const cantidadCamiones = await Camiones.find().countDocuments();
        
        const newCamiones = new Camiones({
            Descripcion,
            NombreCorto,
            Marca,
            Anio,
            Placa
        });
        
        /*newProducto.CodigoProducto = cantidadProductos + 1;
        await newProducto.save();*/

        await Consecutivo.findOne({"Prefijo":"CA"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                //Consecutivo.findOneAndUpdate({"Prefijo":"PR"}, {"ValorConsecutivo":a})
                Consecutivo.updateOne({Prefijo:"CA"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        newCamiones.CodigoCamion = a;
                        newCamiones.save();
                    }
                })
            }
        });

        await Consecutivo.findOne({"Prefijo":"CA"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var cant = cantidadCamiones+1;
                Consecutivo.updateOne({Prefijo:"CA"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }
                })
            }
        });
        req.flash("success_msg", "Camión Añadido");
        res.redirect("/camiones");
    }
});


router.get('/camiones/edit/:id', async (req, res) => {
    const camiones = await Camiones.findById(req.params.id);

    res.render("camiones/edit-camiones", {
        camiones
    });
});

router.put('/camiones/edit-camiones/:id', async (req, res) => {
    const {
        //CodigoCamion,
            Descripcion,
            NombreCorto,
            Marca,
            Anio,
            Placa
    } = req.body;
    
    await Camiones.findByIdAndUpdate(req.params.id, {
        //CodigoCamion,
            Descripcion,
            NombreCorto,
            Marca,
            Anio,
            Placa
    });
    req.flash("success_msg", "Camión Editado Exitosamente");
    res.redirect("/camiones");
});

router.delete('/camiones/delete/:id', async (req, res) => {
    await Camiones.findByIdAndDelete(req.params.id);
    const cantidadCamiones = await Camiones.find().countDocuments();
    console.log("cantidad "+cantidadCamiones);
    await Consecutivo.findOne({"Prefijo":"CA"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadCamiones;
            Consecutivo.updateOne({Prefijo:"CA"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Camión Eliminado Exitosamente");
    res.redirect("/camiones");
});




module.exports = router;