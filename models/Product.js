const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		star: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('lotus-e-shop-Product', ProductSchema);
