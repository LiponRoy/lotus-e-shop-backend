const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongodb_con = require('./DB_connect/MongodbMe');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const testRoutes = require('./routes/testMe');
// const productRoutes = require('./routes/product');
const cors = require('cors');
const cloudinary = require('cloudinary');

dotenv.config();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
// app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/test', testRoutes);

//error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Something went wrong!';
	return res.status(status).json({
		success: false,
		status,
		message,
		stack: err.stack,
	});
});

//connection with MongoDB Database
mongodb_con();

// Setting up cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// created express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`The Server is running on port: ${port}`);
});
