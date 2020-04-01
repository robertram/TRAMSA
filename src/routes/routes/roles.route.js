const express= require('express');
const router = express.Router();

const {renderRoles} = require('../controllers/roles.controllers');

router.get('/roles',renderRoles);

module.exports = router;