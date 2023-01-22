const express = require('express');
const { signup, signin, logout, getUserProfile } = require('../controllers/auth');
const { verifyToken } = require('../utils/verifyTokenJwt');

const router = express.Router();
verifyToken;
//CREATE A USER
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);
//SIGN Out
router.get('/logout', logout);
//Get user profile
router.get('/getUserProfile', verifyToken, getUserProfile);

module.exports = router;
