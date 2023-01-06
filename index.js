const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.get('/', (req, res) => {
	res.send('Hello Express!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`The Server is running on port: ${port}`);
});
