const express= require('express');
const router = express.Router();

const {renderProduccionEnLote} = require('../controllers/produccionEnLote.controllers');

router.get('/produccionEnLote',renderProduccionEnLote);

module.exports = router;