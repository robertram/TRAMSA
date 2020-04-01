const express= require('express');
const router = express.Router();

const {renderPedidosPendientes} = require('../controllers/pedidosPendientes.controllers');

router.get('/pedidosPendientes',renderPedidosPendientes);

module.exports = router;