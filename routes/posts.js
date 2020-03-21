const express = require('express');
const router = express.Router();
//const producto = require('../models/producto');

router.get('/', (req, res) => {
    res.send('We are on posts!!')
});

router.get('/specific', (req, res) => {
    res.send('We are on specific!!')
});

module.exports = router;