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
        CodigoMateriaPrima,
        Descripcion,
        PuntosReOrden,
        UnidadDeMedida
    } = req.body;
    const CodigoProducto = 1;
    const errors = [];
    //Chequeo si está vacío el textbox
    if (!CodigoMateriaPrima) {
        errors.push({
            text: "Please Write a CodigoMateriaPrima."
        });
    }
    if (!Descripcion) {
        errors.push({
            text: "Please Write a Descripcion"
        });
    }
    if (!PuntosReOrden) {
        errors.push({
            text: "Please Write a PuntosReOrden."
        });
    }
    if (!UnidadDeMedida) {
        errors.push({
            text: "Please Write a UnidadDeMedida"
        });
    }

    if (!CodigoProducto) {
        errors.push({
            text: "Please Write a CodigoProducto"
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
        //newProducto.user = req.user.id;
        await newProducto.save();
        //req.flash("success_msg", "Producto Añadido");
        res.redirect("/productos");
    }
});

router.get('/productos/edit/:id', isAuthenticated, async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    /*if (producto.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }*/
    res.render("productos/edit-producto", {
        producto
    });
});

router.put('/productos/edit-producto/:id', isAuthenticated, async (req, res) => {
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

router.delete('/productos/delete/:id', isAuthenticated, async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Producto Eliminado Exitosamente");
    res.redirect("/productos");
});




module.exports = router;