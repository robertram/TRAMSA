const express= require('express');
const router = express.Router();

const {renderPuntoDeVenta} = require('../controllers/puntoDeVenta.controllers');

router.get('/puntoDeVenta',renderPuntoDeVenta);

module.exports = router;