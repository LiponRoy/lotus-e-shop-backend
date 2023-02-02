import express from 'express';
import { createProduct, getAllProduct, getProduct } from '../controllers/product.js';
// const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyTokenJwt');

const router = express.Router();

//CREATE A PRODUCT
router.post('/create', createProduct);
// router.get('/getAll', getAllProduct);
// router.get('/getOne/:id', verifyToken, getProduct);

export default router;
