const jwt = require('jsonwebtoken');
const { createError } = require('../error');

const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(createError(401, 'your not authorized'));
	}

	jwt.verify(token, process.env.JWT, (err, info) => {
		if (err) {
			return next(createError(401, 'token is invalid'));
		}

		req.user = info;
		next();
	});
};

module.exports = {
	verifyToken,
};
