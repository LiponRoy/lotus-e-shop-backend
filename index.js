const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongodb_con = require('./DB_connect/MongodbMe');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

dotenv.config();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

//error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong!';
	return res.status(status).json({
		success: false,
		status,
		message,
	});
});

//connection with MongoDB Database
mongodb_con();
// created express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`The Server is running on port: ${port}`);
});
