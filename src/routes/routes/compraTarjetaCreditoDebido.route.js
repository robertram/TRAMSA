const express= require('express');
const router = express.Router();

const {renderCompraTarjetaCreditoDebido} = require('../controllers/compraTarjetaCreditoDebido.controllers');

router.get('/compraTarjetaCreditoDebido',renderCompraTarjetaCreditoDebido);

module.exports = router;