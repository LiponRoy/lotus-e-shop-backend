import express from 'express';
import { signup, signin, logout, getUserProfile } from '../controllers/auth.js';
import { verifyToken } from '../utils/verifyTokenJwt.js';

const router = express.Router();

//CREATE A USER
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);
//SIGN Out
router.post('/logout', logout);
//Get user profile
router.get('/getUserProfile', verifyToken, getUserProfile);

export default router;
