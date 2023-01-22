const mongoose = require('mongoose');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const { createError } = require('../error.js');
const jwt = require('jsonwebtoken');

//  signup user
const signup = async (req, res, next) => {
	try {
		const alreadyUser = await User.findOne({ email: req.body.email });
		if (alreadyUser) return next(createError(404, 'User already exits !'));

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({ ...req.body, password: hash });

		await newUser.save();
		// create jwt and set to Cookie
		const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT);
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json('User has been created!');
	} catch (err) {
		next(err);
	}
};

//  signin user
const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return next(createError(404, 'User not found!'));

		const isCorrect = await bcrypt.compare(req.body.password, user.password);

		if (!isCorrect) return next(createError(400, 'Wrong Credentials!'));

		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
		const { password, ...others } = user._doc;

		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(others);
	} catch (err) {
		next(err);
	}
};

//  Logout user
const logout = async (req, res, next) => {
	try {
		res.cookie('access_token', '', {
			expires: new Date(Date.now()),
			httpOnly: true,
		});
		res.status(200).json({
			success: true,
			message: 'Log out success',
		});
	} catch (err) {
		next(err);
	}
};

const getUserProfile = async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
};

module.exports = {
	signup,
	signin,
	logout,
	getUserProfile,
};
