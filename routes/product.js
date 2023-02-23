const express = require('express');
const { createProduct, getAllProduct, getProduct } = require('../controllers/product.js');
// const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyTokenJwt');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', createProduct);
router.get('/getAll', getAllProduct);
router.get('/getOne/:id', getProduct);

module.exports = router;
