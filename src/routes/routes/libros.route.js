const express= require('express');
const router = express.Router();

const {renderLibrosFormulario} = require('../controllers/libros.controllers');

router.get('/librosFormulario',renderLibrosFormulario);

module.exports = router;