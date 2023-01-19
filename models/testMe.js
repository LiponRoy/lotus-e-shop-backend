const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title'],
	},
	otherText: {
		type: String,
		required: [true, 'Please add a text'],
	},
	mobile_no: {
		type: String,
		required: [true, 'Please add a text'],
	},
});

module.exports = mongoose.model('Test', testSchema);
