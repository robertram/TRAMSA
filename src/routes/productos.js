const {
    Router
} = require('express');
const router = Router();

const Producto = require('../models/Producto');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/productos', isAuthenticated, async (req, res) => {
    const productos = await Producto.find().sort([
        ['updatedAt', 'descending']
    ]);

    res.render('productos/new-producto', {
        productos   
    });
});

router.post('/productos/new-producto', isAuthenticated, async (req, res) => {
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
        newProducto.CodigoProducto = cantidadProductos + 1;
        await newProducto.save();
        req.flash("success_msg", "Producto Añadido");
        res.redirect("/productos");
    }
});

router.get('/productos/edit/:id', isAuthenticated, async (req, res) => {
    const producto = await Producto.findById(req.params.id);

    res.render("productos/edit-producto", {
        producto
    });
});

router.put('/productos/edit-producto/:id', isAuthenticated, async (req, res) => {
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

router.delete('/productos/delete/:id', isAuthenticated, async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Producto Eliminado Exitosamente");
    res.redirect("/productos");
});




module.exports = router;