const express = require('express');
const { createProduct } = require('../controllers/product');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', createProduct);

module.exports = router;
