const {
    Router
} = require('express');
const router = Router();

const MateriaPrima = require('../models/MateriaPrima');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/materiaPrima', isAuthenticated, async(req, res) => {
    const materiaPrima = await MateriaPrima.find().sort([
        ['updatedAt', 'descending']
    ]);
    res.render('materiaPrima/new-materiaPrima', {
        materiaPrima
    });
});

router.post('/materiaPrima/new-materiaPrima', isAuthenticated, async (req, res) => {
    const {
        CodigoMateriaPrima,
        Nombre,
        CantidadExistente,
        UnidadDeMedida,
        } = req.body;
    
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!CodigoMateriaPrima) {
        errors.push({
            text: "Please Write a CodigoMateriaPrima."
        });
    }
    if (!Nombre) {
        errors.push({
            text: "Please Write a Nombre"
        });
    }
    if (!CantidadExistente) {
        errors.push({
            text: "Please Write a CantidadExistente."
        });
    }
    if (!UnidadDeMedida) {
        errors.push({
            text: "Please Write a UnidadDeMedida"
        });
    }

    if (errors.length > 0) {
        res.render("materiaPrima/new-materiaPrima", {
            errors, //No se quita
            CodigoMateriaPrima,
            Nombre,
            CantidadExistente,
            UnidadDeMedida
        });
    } else {
        const cantidadMateriaPrima = await MateriaPrima.find().countDocuments();

        const newMateriaPrima = new MateriaPrima({
            CodigoMateriaPrima,
            Nombre,
            CantidadExistente,
            UnidadDeMedida
        });

        await Consecutivo.findOne({"Prefijo":"MP"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                //Consecutivo.findOneAndUpdate({"Prefijo":"PR"}, {"ValorConsecutivo":a})
                Consecutivo.updateOne({Prefijo:"MP"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        newMateriaPrima.CodigoMateriaPrima = a;
                        newMateriaPrima.save();
                    }
                })
            }
        });

        await Consecutivo.findOne({"Prefijo":"MP"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var cant = cantidadMateriaPrima+1;
                Consecutivo.updateOne({Prefijo:"MP"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }
                })
            }
        });
        //newMateriaPrima.user = req.user.id;
        //newMateriaPrima.CodigoMateriaPrima = cantidadMateriaPrima+1;
        //newMateriaPrima.Consecutivo = cantidadMateriaPrima+1;
        //await newMateriaPrima.save();
        //req.flash("success_msg", "MateriaPrima Añadido");
        req.flash("success_msg", "Materia Prima Añadida");
        res.redirect("/materiaPrima");
    }
});

router.get('/materiaPrima/edit/:id', async (req, res) => {
    const materiaPrima = await MateriaPrima.findById(req.params.id);

    res.render("materiaPrima/edit-materiaPrima", {
        materiaPrima
    });
});

router.put('/materiaPrima/edit-materiaPrima/:id', async (req, res) => {
    const {
        //CodigoMateriaPrima,
        Nombre,
        CantidadExistente
        //UnidadDeMedida
    } = req.body;
    const UnidadDeMedida= req.body.selectUM;
    await MateriaPrima.findByIdAndUpdate(req.params.id, {
        Nombre,
        CantidadExistente,
        UnidadDeMedida
    });
    req.flash("success_msg", "Materia Prima Editada Exitosamente");
    res.redirect("/materiaPrima");
});

router.delete('/materiaPrima/delete/:id', async (req, res) => {
    console.log('entra')
    await MateriaPrima.findByIdAndDelete(req.params.id);
    const cantidadMateriaPrima = await MateriaPrima.find().countDocuments();
    console.log("cantidad "+cantidadMateriaPrima);
    await Consecutivo.findOne({"Prefijo":"MP"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadMateriaPrima;
            Consecutivo.updateOne({Prefijo:"MP"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Materia Prima Eliminada Exitosamente");
    res.redirect("/materiaPrima");
});

module.exports = router;