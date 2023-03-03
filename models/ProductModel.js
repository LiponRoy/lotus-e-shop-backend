import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		brand: { type: String, required: true },
		desc: { type: String, required: true },
		price: { type: Number, required: true },
		image: { type: Object, required: true },
	},
	{ timestamps: true },
);

export default mongoose.model('Lotus-Product', ProductSchema);
