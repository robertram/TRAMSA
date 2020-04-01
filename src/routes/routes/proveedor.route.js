const express= require('express');
const router = express.Router();

const {renderProveedor} = require('../controllers/proveedor.controllers');

router.get('/proveedor',renderProveedor);

module.exports = router;