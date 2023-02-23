const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');
const product = require('./routes/product.js');
const cookieParser = require('cookie-parser');
// for cludenary
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

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

const port = process.env.PORT;

app.listen(port, () => {
	connect();
	console.log('Connected to backend on port..' + port);
});
