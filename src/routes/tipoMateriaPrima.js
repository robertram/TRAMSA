const {
    Router
} = require('express');
const router = Router();

const TipoMateriaPrima = require('../models/TipoMateriaPrima');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/tipoMateriaPrima', async (req, res) => {
    const tipoMateriaPrima = await TipoMateriaPrima.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('tipoMateriaPrima/new-tipoMateriaPrima', {
        tipoMateriaPrima   
    });
});

router.post('/tipoMateriaPrima/new-tipoMateriaPrima', async (req, res) => {
    const {
        //CodigoTipoMateriaPrima,
        Descripcion
    } = req.body;
    
    const CodigoTipoMateriaPrima = 1;
    const errors = [];
    //Chequeo si está vacío el textbox
    
    if (!Descripcion) {
        errors.push({
            text: "Escribe Descripcion"
        });
    }

    if (errors.length > 0) {
        res.render("tipoMateriaPrima/new-tipoMateriaPrima", {
            errors, //No se quita
            Descripcion
        });
    } else {
        const cantidadTipoMateriaPrima = await TipoMateriaPrima.find().countDocuments();
        const newTipoMateriaPrima = new TipoMateriaPrima({
            Descripcion
        });
        await Consecutivo.findOne({"Prefijo":"TMP"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                //Consecutivo.findOneAndUpdate({"Prefijo":"PR"}, {"ValorConsecutivo":a})
                Consecutivo.updateOne({Prefijo:"TMP"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        console.log("a ",a);
                        newTipoMateriaPrima.CodigoTipoMateriaPrima = a;
                        newTipoMateriaPrima.save();
                    }
                })
            }
        });

        await Consecutivo.findOne({"Prefijo":"TMP"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var cant = cantidadTipoMateriaPrima+1;
                Consecutivo.updateOne({Prefijo:"TMP"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }
                })
            }
        });
        req.flash("success_msg", "Tipo Materia Prima Añadido");
        res.redirect("/tipoMateriaPrima");
    }
});


router.get('/tipoMateriaPrima/edit/:id', async (req, res) => {
    const tipoMateriaPrima = await TipoMateriaPrima.findById(req.params.id);
    console.log(tipoMateriaPrima);

    res.render("tipoMateriaPrima/edit-tipoMateriaPrima", {
        tipoMateriaPrima
    });
});

router.put('/tipoMateriaPrima/edit-tipoMateriaPrima/:id', async (req, res) => {
    const {
        Descripcion
    } = req.body;
    await TipoMateriaPrima.findByIdAndUpdate(req.params.id, {
        Descripcion
    });
    req.flash("success_msg", "Tipo Materia Prima Editado Exitosamente");
    res.redirect("/tipoMateriaPrima");
});

router.delete('/tipoMateriaPrima/delete/:id', async (req, res) => {
    await TipoMateriaPrima.findByIdAndDelete(req.params.id);
    const cantidadTipoMateriaPrima = await TipoMateriaPrima.find().countDocuments();
    console.log("cantidad "+cantidadTipoMateriaPrima);
    await Consecutivo.findOne({"Prefijo":"TMP"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadTipoMateriaPrima;
            Consecutivo.updateOne({Prefijo:"TMP"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Tipo Materia Prima Eliminado Exitosamente");
    res.redirect("/tipoMateriaPrima");
});

module.exports = router;