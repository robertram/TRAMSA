const express= require('express');
const router = express.Router();

const {renderUsuario} = require('../controllers/usuario.controllers');

router.get('/usuario',renderUsuario);

module.exports = router;