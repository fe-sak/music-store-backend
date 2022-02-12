import { Router } from 'express';
import { getProduct } from '../controllers/productController.js';
import { products } from '../controllers/userController.js';
import validateObjectId from '../middlewares/validateObjectIdMiddleware.js';

const productRouter = Router();

productRouter.get('/product/:id', validateObjectId, getProduct);
productRouter.get('/products', products)

export default productRouter;
