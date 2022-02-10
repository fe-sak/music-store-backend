import { Router } from 'express';
import { getProduct } from '../controllers/productController.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';

const productRouter = Router();

productRouter.get('/product/:id', validateToken, getProduct);

export default productRouter;
