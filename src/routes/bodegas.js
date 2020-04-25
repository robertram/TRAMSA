const {
    Router
} = require('express');
const router = Router();

const Bodega = require('../models/Bodega');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/bodegas', async (req, res) => {
    const bodega = await Bodega.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('bodega/new-bodega', {
        bodega   
    });
});

router.post('/bodega/new-bodega', async (req, res) => {
    const {
        //CodigoBodega,
        Nombre,
        NombreCorto,
        Alias,
        Ubicacion,
        UnidadMedida,
        TipoBodega,
        EspacioBodega
    } = req.body;
    const CodigoBodega = 1;
    const errors = [];
    //Chequeo si está vacío el textbox
    
    if (!Nombre) {
        errors.push({
            text: "Please Write a Nombre"
        });
    }
    if (!NombreCorto) {
        errors.push({
            text: "Please Write a NombreCorto."
        });
    }
    if (!Alias) {
        errors.push({
            text: "Please Write a Alias"
        });
    }

    if (!Ubicacion) {
        errors.push({
            text: "Please Write a Ubicacion"
        });
    }

    if (!UnidadMedida) {
        errors.push({
            text: "Please Write a UnidadMedida"
        });
    }

    if (!TipoBodega) {
        errors.push({
            text: "Please Write a TipoBodega"
        });
    }

    if (!EspacioBodega) {
        errors.push({
            text: "Please Write a EspacioBodega"
        });
    }

    if (errors.length > 0) {
        res.render("bodega/new-bodega", {
            errors, //No se quita
            Nombre,
            NombreCorto,
            Alias,
            Ubicacion,
            UnidadMedida,
            TipoBodega,
            EspacioBodega
        });
    } else {
        
        const cantidadBodegas = await Bodega.find().countDocuments();
        console.log(cantidadBodegas);

        const newBodega = new Bodega({
            Nombre,
            NombreCorto,
            Alias,
            Ubicacion,
            UnidadMedida,
            TipoBodega,
            EspacioBodega
        });
        
        
        /*newProducto.CodigoProducto = cantidadProductos + 1;
        await newProducto.save();*/

        await Consecutivo.findOne({"Prefijo":"BO"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                //Consecutivo.findOneAndUpdate({"Prefijo":"PR"}, {"ValorConsecutivo":a})
                Consecutivo.updateOne({Prefijo:"BO"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        newBodega.CodigoBodega = a;
                        newBodega.save();
                    }
                })
            }
        });

        await Consecutivo.findOne({"Prefijo":"BO"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var cant = cantidadBodegas+1;
                Consecutivo.updateOne({Prefijo:"BO"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }
                })
            }
        });

        //const Idproducto = await Producto.findById(req.params.id);
        /*await Consecutivo.findByIdAndUpdate(req.params.id, {
            ValorConsecutivo
        });*/
        //console.log("id producto "+Idproducto+" _id "+_id);
        req.flash("success_msg", "Bodega Añadida");
        res.redirect("/bodega");
    }
});


router.get('/bodega/edit/:id', async (req, res) => {
    const bodega = await Bodega.findById(req.params.id);

    res.render("bodega/edit-bodega", {
        bodega
    });
});

router.put('/bodega/edit-bodega/:id', async (req, res) => {
    const {
        Nombre,
        NombreCorto,
        Alias,
        Ubicacion,
        UnidadMedida,
        TipoBodega,
        EspacioBodega
    } = req.body;
    await Bodega.findByIdAndUpdate(req.params.id, {
        Nombre,
        NombreCorto,
        Alias,
        Ubicacion,
        UnidadMedida,
        TipoBodega,
        EspacioBodega
    });
    req.flash("success_msg", "Bodega Editada Exitosamente");
    res.redirect("/bodega");
});

router.delete('/bodega/delete/:id', async (req, res) => {
    await Bodega.findByIdAndDelete(req.params.id);
    const cantidadBodegas = await Bodega.find().countDocuments();
    console.log("cantidad "+cantidadBodegas);
    await Consecutivo.findOne({"Prefijo":"BO"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadBodegas;
            Consecutivo.updateOne({Prefijo:"BO"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Bodega Eliminada Exitosamente");
    res.redirect("/bodega");
});




module.exports = router;