const express= require('express');
const router = express.Router();

const {renderProductos} = require('../controllers/productos.controllers');

router.get('/productos',renderProductos);

module.exports = router;