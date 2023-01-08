const express = require('express');
const { createProduct } = require('../controllers/product');
const { verifyToken } = require('../utils/verifyToken');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', verifyToken, createProduct);

module.exports = router;
