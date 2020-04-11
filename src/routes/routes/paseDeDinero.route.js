const express= require('express');
const router = express.Router();

const {renderPaseDeDinero} = require('../controllers/paseDeDinero.controllers');

router.get('/paseDeDinero',renderPaseDeDinero);

module.exports = router;