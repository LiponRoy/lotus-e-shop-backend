const express = require('express');
const { createProduct, getAllProduct, getProduct } = require('../controllers/product.js');

const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/getAll', getAllProduct);
productRouter.get('/getOne/:id', getProduct);

module.exports = productRouter;
