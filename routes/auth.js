const express = require('express');
const { signup, signin, logout, getUserProfile } = require('../controllers/auth.js');
const { verifyToken } = require('../utils/verifyTokenJwt.js');

const router = express.Router();

//CREATE A USER
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);
//SIGN Out
router.post('/logout', logout);
//Get user profile
router.get('/getUserProfile', verifyToken, getUserProfile);

module.exports = router;
