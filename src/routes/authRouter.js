import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const authRouter = Router();

authRouter.post('/signIn', signIn);

authRouter.post('/signUp', validateTokenMiddleware, signUp);

export default authRouter;
