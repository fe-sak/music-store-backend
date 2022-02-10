import { Router } from 'express';
import { getProduct } from '../controllers/productController.js';
import validateObjectId from '../middlewares/validateObjectIdMiddleware.js';

const productRouter = Router();

productRouter.get('/product/:id', validateObjectId, getProduct);

export default productRouter;
