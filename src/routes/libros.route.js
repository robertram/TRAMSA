const express= require('express');
const router = express.Router();

const {renderLibrosFormulario, crearNuevoLibro} = require('../controllers/libros.controllers');

router.get('/librosFormulario',renderLibrosFormulario);

router.get('/crearNuevoLibro',crearNuevoLibro)

module.exports = router;