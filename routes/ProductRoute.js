import express from 'express';
import { createProduct, getAllProduct, getProduct } from '../controllers/product.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/VerifyTokenJwt.js';
const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/getAll', verifyToken, getAllProduct);
productRouter.get('/getOne/:id', getProduct);

export default productRouter;
