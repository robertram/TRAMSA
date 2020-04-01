const express= require('express');
const router = express.Router();

const {renderLibrosFormulario, 
    crearNuevoProducto, 
    renderProductos
} = require('../controllers/productos.controllers');

router.get('/productos/agregar',crearNuevoProducto);

router.post('/productos/nuevo-producto',renderProductos)

module.exports = router;