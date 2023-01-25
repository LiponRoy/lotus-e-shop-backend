// const mongoose = require('mongoose');
// const User = require('../models/user');
// const { createError } = require('../error');

// const getUser = async (req, res, next) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		if (!user) {
// 			return next(createError(401, 'user not found'));
// 		}
// 		res.status(200).json(user);
// 	} catch (err) {
// 		next(err);
// 	}
// };
// const getUsers = async (req, res, next) => {
// 	try {
// 		const users = await User.find();
// 		if (!users) {
// 			return next(createError(401, 'users not found'));
// 		}
// 		res.status(200).json(users);
// 	} catch (err) {
// 		next(err);
// 	}
// };
// const deleteUser = async (req, res, next) => {
// 	try {
// 		await User.findByIdAndDelete(req.params.id);
// 		res.status(200).json('User has been deleted.');
// 	} catch (err) {
// 		next(err);
// 	}
// };

// module.exports = {
// 	getUser,
// 	getUsers,
// 	deleteUser,
// };
