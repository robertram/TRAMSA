const {
    Router
} = require('express');
const router = Router();

const Producto = require('../models/Producto');
const Consecutivo = require('../models/Consecutivos');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/productos', async (req, res) => {
    const productos = await Producto.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('productos/new-producto', {
        productos   
    });
});

router.post('/productos/new-producto', async (req, res) => {
    const {
        //CodigoMateriaPrima,
        Descripcion,
        PuntosReOrden,
        //UnidadDeMedida
    } = req.body;
    const CodigoMateriaPrima= req.body.selectCMT;
    const UnidadDeMedida= req.body.selectUM;
    const CodigoProducto = 1;
    const errors = [];
    //Chequeo si está vacío el textbox
    
    if (!Descripcion) {
        errors.push({
            text: "Escribe Descripcion"
        });
    }
    if (!PuntosReOrden) {
        errors.push({
            text: "Escribe Puntos ReOrden."
        });
    }

    if (errors.length > 0) {
        res.render("productos/new-producto", {
            errors, //No se quita
            CodigoMateriaPrima,
            Descripcion,
            PuntosReOrden,
            UnidadDeMedida,
            CodigoProducto
        });
    } else {
        const cantidadProductos = await Producto.find().countDocuments();
        

        const newProducto = new Producto({
            CodigoMateriaPrima,
            Descripcion,
            PuntosReOrden,
            UnidadDeMedida
        });
        
        /*newProducto.CodigoProducto = cantidadProductos + 1;
        await newProducto.save();*/

        await Consecutivo.findOne({"Prefijo":"PR"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var a = data.ValorConsecutivo;
                a=a+1;
                //Consecutivo.findOneAndUpdate({"Prefijo":"PR"}, {"ValorConsecutivo":a})
                Consecutivo.updateOne({Prefijo:"PR"}, {$set: {ValorConsecutivo:a}}, (err, res)=>{
                    if(err){
                        console.log(err)
                        throw err;
                    }else{
                        newProducto.CodigoProducto = a;
                        newProducto.save();
                    }
                })
            }
        });

        await Consecutivo.findOne({"Prefijo":"PR"}, (err,data)=>{
            if(err || !data){
                console.log(err);
                return next(err);
            }else{
                var cant = cantidadProductos+1;
                Consecutivo.updateOne({Prefijo:"PR"}, {$set: {CantidadActual:cant}}, (err, res)=>{
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
        req.flash("success_msg", "Producto Añadido");
        res.redirect("/productos");
    }
});


router.get('/productos/edit/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);

    res.render("productos/edit-producto", {
        producto
    });
});

router.put('/productos/edit-producto/:id', async (req, res) => {
    const {
        //CodigoMateriaPrima,
        Descripcion,
        PuntosReOrden
        //UnidadDeMedida
    } = req.body;
    const CodigoMateriaPrima= req.body.selectCMT;
    const UnidadDeMedida= req.body.selectUM;
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
    const cantidadProductos = await Producto.find().countDocuments();
    console.log("cantidad "+cantidadProductos);
    await Consecutivo.findOne({"Prefijo":"PR"}, (err,data)=>{
        if(err || !data){
            console.log(err);
            return next(err);
        }else{
            var cant = cantidadProductos;
            Consecutivo.updateOne({Prefijo:"PR"}, {$set: {CantidadActual:cant}}, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
            })
        }
    });
    req.flash("success_msg", "Producto Eliminado Exitosamente");
    res.redirect("/productos");
});

// with express, in some route
router.get('/pdf',  async (req, res, next) =>{
    const cantidadProductos = await Producto.find();
    var pdf = require('./pdfkit').create(cantidadProductos);
    pdf.pipe(res);
    pdf.end();
});




module.exports = router;