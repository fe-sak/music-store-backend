import { Router } from 'express';
import { finishOrder, getProduct } from '../controllers/productController.js';
import { products } from '../controllers/userController.js';
import validateFinishOrder from '../middlewares/validateFinishOrderMiddleware.js';
import validateObjectId from '../middlewares/validateObjectIdMiddleware.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';

const productRouter = Router();

productRouter.get('/product/:id', validateObjectId, getProduct);
productRouter.get('/products', products);
productRouter.post('/cart', validateToken, validateFinishOrder, finishOrder);

export default productRouter;
