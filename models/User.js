const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			// unique: true,
		},
		email: {
			type: String,
			required: true,
			// unique: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('lotus-e-shop-User', UserSchema);
