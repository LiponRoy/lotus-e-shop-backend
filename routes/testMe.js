const express = require('express');
const { insertData } = require('../controllers/testMe');

const router = express.Router();

//CREATE A PRODUCT
router.post('/testMe', insertData);

module.exports = router;
