import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signIn', signIn);

authRouter.post('/signUp', signUp);

export default authRouter;
