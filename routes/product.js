const express = require('express');
const { createProduct, getAllProduct } = require('../controllers/product');
const { verifyToken, authorizeRoles } = require('../utils/verifyToken');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', verifyToken, createProduct);
router.get('/getAll', verifyToken, authorizeRoles('admin'), getAllProduct);

module.exports = router;
