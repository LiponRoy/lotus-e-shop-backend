import express from 'express';
import { signup, signin, logout, getUserProfile, forgotPassword, resetPassword } from '../controllers/AuthControllers.js';

const authRouter = express.Router();

//CREATE A USER
authRouter.post('/signup', signup);

//SIGN IN
authRouter.post('/signin', signin);
//SIGN Out
authRouter.post('/logout', logout);
//Get user profile
authRouter.get('/getUserProfile', getUserProfile);

// router.route('/forgotpassword').post(forgotPassword);

// router.route('/passwordreset/:resetToken').put(resetPassword);

authRouter.post('/forgotPassword', forgotPassword);
authRouter.put('/passwordReset/:resetToken', resetPassword);

export default authRouter;
