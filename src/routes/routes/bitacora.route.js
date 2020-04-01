const express= require('express');
const router = express.Router();

const {renderBitacora} = require('../controllers/bitacora.controllers');

router.get('/bitacora',renderBitacora);

module.exports = router;