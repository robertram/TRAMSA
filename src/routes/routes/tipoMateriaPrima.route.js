const express= require('express');
const router = express.Router();

const {renderTipoMateriaPrima} = require('../controllers/tipoMateriaPrima.controllers');

router.get('/tipoMateriaPrima',renderTipoMateriaPrima);

module.exports = router;