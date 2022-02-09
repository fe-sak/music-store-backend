import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/register', validateTokenMiddleware, register);

export default authRouter;
