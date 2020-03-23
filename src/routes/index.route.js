const { Router } = require('express');
const router = Router();
const { renderIndex, renderAcerca, renderLibros} =require('../controllers/index.controllers')


router.get('/',renderIndex);

router.get('/acercade',renderAcerca)

router.get('/libros',renderLibros)

module.exports = router;