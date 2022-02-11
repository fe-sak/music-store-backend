import { Router } from 'express';
import { products } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/products', products);

export default userRouter;
