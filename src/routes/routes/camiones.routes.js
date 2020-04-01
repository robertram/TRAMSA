const express= require('express');
const router = express.Router();

const {renderCamiones} = require('../controllers/camiones.controllers');

router.get('/camiones',renderCamiones);

module.exports = router;