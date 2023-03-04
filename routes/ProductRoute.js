import express from 'express';
import { createProduct, getAllProduct, getProduct } from '../controllers/product.js';
import { verifyToken, verifyUser, verifyAdmin } from '../VerifyTokenJwt.js';
const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/getAll', getAllProduct);
productRouter.get('/getOne/:id', verifyToken, getProduct);

export default productRouter;
