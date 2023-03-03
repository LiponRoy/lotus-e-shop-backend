import express from 'express';

import { signup, signin, logout, getUserProfile } from '../controllers/AuthControllers.js';
import { verifyToken } from '../utils/VerifyTokenJwt.js';

const authRouter = express.Router();

//CREATE A USER
authRouter.post('/signup', signup);

//SIGN IN
authRouter.post('/signin', signin);
//SIGN Out
authRouter.post('/logout', logout);
//Get user profile
authRouter.get('/getUserProfile', verifyToken, getUserProfile);

export default authRouter;
