import mongoose from 'mongoose';
import authUser from '../models/AuthModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

//  signup user
export const signup = async (req, res, next) => {
	try {
		const alreadyUser = await authUser.findOne({ email: req.body.email });
		if (alreadyUser) return next(createError(404, 'User already exits !'));

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new authUser({ ...req.body, password: hash });

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
export const signin = async (req, res, next) => {
	try {
		const user = await authUser.findOne({ email: req.body.email });
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
export const logout = async (req, res, next) => {
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

export const getUserProfile = async (req, res, next) => {
	const user = await authUser.findById(req.user.id);
	if (!user) return next(createError(400, 'profile User not found...!'));

	res.status(200).json(user);
};

// password reset all
// @desc    Forgot Password Initialization
export const forgotPassword = async (req, res, next) => {
	// Send Email to email provided but first check if user exists
	const { email } = req.body;

	try {
		const user = await authUser.findOne({ email });

		if (!user) {
			// return next(new ErrorResponse('No email could not be sent', 404));
			return next(createError(404, 'No email could not be sent'));
		}

		// Reset Token Gen and add to database hashed (private) version of token
		const resetToken = user.getResetPasswordToken();

		await user.save();

		// Create reset url to email to provided email
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		// HTML Message
		const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

		try {
			await sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				text: message,
			});

			res.status(200).json({ success: true, data: 'Email Sent' });
		} catch (err) {
			console.log(err);

			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			// return next(new ErrorResponse('Email could not be sent', 500));
			return next(createError(500, 'Email could not be sent'));
		}
	} catch (err) {
		next(err);
	}
};

// @desc    Reset User Password
export const resetPassword = async (req, res, next) => {
	// Compare token in URL params to hashed token
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

	try {
		const user = await authUser.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			// return next(new ErrorResponse('Invalid Token', 400));
			return next(createError(400, 'Invalid Token'));
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: 'Password Updated Success',
			// token: user.getSignedJwtToken(),
		});
	} catch (err) {
		next(err);
	}
};
