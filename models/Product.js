import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter product name'],
		trim: true,
		maxLength: [100, 'Product name cannot exceed 100 characters'],
	},
	price: {
		type: Number,
		required: [true, 'Please enter product price'],
		maxLength: [5, 'Product name cannot exceed 5 characters'],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, 'Please enter product description'],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, 'Please select category for this product'],
		enum: {
			values: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home'],
			message: 'Please select correct category for product',
		},
	},
});

export default mongoose.model('Lotus-Product', productSchema);
