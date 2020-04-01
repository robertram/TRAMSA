const express= require('express');
const router = express.Router();

const {renderCliente} = require('../controllers/cliente.controllers');

router.get('/cliente',renderCliente);

module.exports = router;