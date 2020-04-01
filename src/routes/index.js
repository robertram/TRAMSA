const { Router } = require('express');
const router = Router();
//const { renderIndex, renderAcerca, renderLibros, renderError} =require('../controllers/index.controllers')


router.get('/',(res, req)=>{
    res.send('index');
});

/*
router.get('/acercade',renderAcerca)

router.get('/libros',renderLibros)

router.get('/error',renderError)*/

module.exports = router;