const express = require('express');
const { getUser, getUsers, deleteUser } = require('../controllers/user');
const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyTokenJwt');

const router = express.Router();
//CREATE A USER
router.get('/getAll', getUsers);

router.get('/getOne/:id', verifyToken, verifyUser, getUser);

router.delete('/deleteOne/:id', verifyToken, verifyUser, deleteUser);

module.exports = router;
