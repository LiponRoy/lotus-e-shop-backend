const express = require('express');
const { signup, signin, logout, getUserProfile } = require('../controllers/auth.js');
const { verifyToken } = require('../utils/verifyTokenJwt.js');

const authRouter = express.Router();

//CREATE A USER
authRouter.post('/signup', signup);

//SIGN IN
authRouter.post('/signin', signin);
//SIGN Out
authRouter.post('/logout', logout);
//Get user profile
authRouter.get('/getUserProfile', verifyToken, getUserProfile);

module.exports = authRouter;
