const express= require('express');
const router = express.Router();

const {renderProcesosDetalle} = require('../controllers/procesosDetalle.controllers');

router.get('/procesosDetalle',renderProcesosDetalle);

module.exports = router;