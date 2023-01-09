const mongoose = require('mongoose');

const mongoConnect = async () => {
	try {
		mongoose.set('strictQuery', false);
		const con = await mongoose.connect(process.env.Mongo_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`mongo db connected, Yeahoo!  :${con.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
	// when mongoDB disconnected
	mongoose.connection.on('disconnected', () => {
		console.log('mongoDB disconnected!');
	});
};
module.exports = mongoConnect;
