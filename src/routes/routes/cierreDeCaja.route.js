const express= require('express');
const router = express.Router();

const {renderCierreDeCaja} = require('../controllers/cierreDeCaja.controllers');

router.get('/cierreDeCaja',renderCierreDeCaja);

module.exports = router;