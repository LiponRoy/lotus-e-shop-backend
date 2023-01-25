import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.Mongo_URL);
		mongoose.set('strictQuery', false);
		console.log('Connected to mongoDB.');
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('mongoDB disconnected!');
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
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

const port = process.env.PORT;

app.listen(port, () => {
	connect();
	console.log('Connected to backend on port..' + port);
});
