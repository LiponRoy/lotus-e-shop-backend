import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// for cludenary
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
// Routes
import AuthRoutes from './routes/AuthRoutes.js';
import ProductRoute from './routes/ProductRoute.js';

const app = express();
dotenv.config();

// mongoose.set('strictQuery', true);

const connect = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.Mongo_URL);
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

app.use('/api/auth', AuthRoutes);
app.use('/api/product', ProductRoute);

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

const port = process.env.PORT;

app.listen(port, () => {
	connect();
	console.log('Connected to backend on port..' + port);
});
