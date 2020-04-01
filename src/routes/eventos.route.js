const express= require('express');
const router = express.Router();

const {renderEventos} = require('../controllers/eventos.controllers');

router.get('/eventos',renderEventos);

module.exports = router;