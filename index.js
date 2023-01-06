const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongodb_con = require('./DB_connect/MongodbMe');

dotenv.config();
//connection with MongoDB Database
mongodb_con();

app.get('/', (req, res) => {
	res.send('Hello Express!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`The Server is running on port: ${port}`);
});
