const { Router } = require('express');
const router = Router();
//const { renderIndex, renderAcerca, renderLibros, renderError} =require('../controllers/index.controllers')


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/acercade', (req, res) => {
    res.render('acercade');
});

router.get('/libros', (req, res) => {
    res.render('libros');
});

router.get('/error', (req, res) => {
    res.render('error');
});


/*
router.get('/acercade',renderAcerca)

router.get('/libros',renderLibros)

router.get('/error',renderError)*/

module.exports = router;