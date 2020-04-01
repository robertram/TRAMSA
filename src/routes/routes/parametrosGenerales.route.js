const express= require('express');
const router = express.Router();

const {renderparametrosGenerales} = require('../controllers/parametrosGenerales.controllers');

router.get('/gen',renderparametrosGenerales);


router.post("/parametrosGenerales", (res,req)=>{
    console.log(req.body);
    res.send('ok');
});

module.exports = router;