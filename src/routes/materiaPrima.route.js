const express= require('express');
const router = express.Router();

const {renderMateriaPrima} = require('../controllers/materiaPrima.controllers');

router.get('/materiaPrima',renderMateriaPrima);

module.exports = router;