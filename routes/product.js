const express = require('express');
const { createProduct, getAllProduct, getProduct } = require('../controllers/product');
const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyTokenJwt');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', createProduct);
router.get('/getAll', getAllProduct);
router.get('/getOne/:id', verifyToken, getProduct);

module.exports = router;
