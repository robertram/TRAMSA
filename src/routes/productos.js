const {
    Router
} = require('express');
const router = Router();

const Producto = require('../models/Producto');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/productos', isAuthenticated, async(req, res) => {
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
        UnidadDeMedida,
        CodigoProducto
    } = req.body;
    
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
        const cantidadProductos = await Producto.find().count();
        console.log(cantidadProductos);

        const newProducto = new Producto({
            CodigoMateriaPrima,
            Descripcion,
            PuntosReOrden,
            UnidadDeMedida,
            CodigoProducto
        });
        //newProducto.user = req.user.id;
        await newProducto.save();
        //req.flash("success_msg", "Producto Añadido");
        res.redirect("/productos");
    }
});



    


module.exports = router;