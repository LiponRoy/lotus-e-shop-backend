const jwt = require('jsonwebtoken');
const { createError } = require('./error.js');

exports.verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	try {
		if (!token) return next(createError(401, 'You are not authenticated!'));
		// jwt.verify(token, process.env.JWT, (err, user) => {
		// 	if (err) return next(createError(403, 'Token is not valid!'));
		// 	req.user = user;
		// 	next();
		// });
		const decoded = jwt.verify(token, process.env.JWT);
		const { id, name } = decoded;
		req.myId = id;
		req.myName = name;
		next();
	} catch (error) {
		return next(createError(401, 'authenticated Failed!'));
	}
};
