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

// Handling users roles
const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(createError(401, 'You are not Admin'));
		}
		next();
	};
};

module.exports = {
	verifyToken,
	authorizeRoles,
};
