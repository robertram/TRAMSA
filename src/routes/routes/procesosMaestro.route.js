const express= require('express');
const router = express.Router();

const {renderProcesosMaestro} = require('../controllers/procesosMaestro.controllers');

router.get('/procesosMaestro',renderProcesosMaestro);

module.exports = router;