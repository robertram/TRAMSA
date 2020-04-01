const express= require('express');
const router = express.Router();

const {renderConsecutivos} = require('../controllers/consecutivos.controllers');

router.get('/consecutivos',renderConsecutivos);

module.exports = router;