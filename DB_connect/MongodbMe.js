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
};
module.exports = mongoConnect;
