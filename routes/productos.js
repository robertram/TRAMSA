const express = require('express');
const router = express.Router();
const producto = require('../models/producto');

router.get('/', (req, res) => {
    res.send('We are on producto')
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;