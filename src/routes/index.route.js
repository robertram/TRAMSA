const { Router } = require('express');
const router = Router();
const { renderIndex, renderAcerca, renderLibros, renderError} =require('../controllers/index.controllers')


router.get('/',renderIndex);

router.get('/acercade',renderAcerca)

router.get('/libros',renderLibros)

router.get('/error',renderError)

module.exports = router;