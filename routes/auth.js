const express = require('express');
const { signup, signin, logout } = require('../controllers/auth');

const router = express.Router();

//CREATE A USER
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);
//SIGN Out
router.get('/logout', logout);

module.exports = router;
