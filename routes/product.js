const express = require('express');
const { createProduct, getAllProduct } = require('../controllers/product');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyTokenJwt.js');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', verifyToken, createProduct);
router.get('/getAll', verifyToken, verifyAdmin, getAllProduct);

module.exports = router;
