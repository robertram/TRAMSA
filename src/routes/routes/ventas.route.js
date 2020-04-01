const express= require('express');
const router = express.Router();

const {renderVentas} = require('../controllers/ventas.controllers');

router.get('/ventas',renderVentas);

module.exports = router;