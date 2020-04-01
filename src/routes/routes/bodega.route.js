const express= require('express');
const router = express.Router();

const {renderBodega} = require('../controllers/bodega.controllers');

router.get('/bodega',renderBodega);

module.exports = router;