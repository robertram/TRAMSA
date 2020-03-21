const express = require('express');
const router = express.Router();
const producto = require('../models/producto');

router.get('/productos', (req, res) => {
    res.send('We are on posts!!')
});

router.post('/', (req, res) => {
    console.log(req.body);
});

router.post('/productos', (req, res) => {
    res.send('We are on posts')
});

module.exports = router;