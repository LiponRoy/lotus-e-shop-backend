import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import product from './routes/product.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// for cludenary
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';

const app = express();
dotenv.config();

// mongoose.set('strictQuery', true);

const connect = async () => {
	try {
		await mongoose.connect(process.env.Mongo_URL);
		mongoose.set('strictQuery', false);
		mongoose.set('strictQuery', true);
		console.log('Connected to mongoDB.');
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('mongoDB disconnected!');
});

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

app.use('/api/auth', authRoutes);
app.use('/api/product', product);
// app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

// Setting up cloudinary configuration
// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const port = process.env.PORT;

app.listen(port, () => {
	connect();
	console.log('Connected to backend on port..' + port);
});
