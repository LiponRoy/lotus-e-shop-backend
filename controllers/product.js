import mongoose from 'mongoose';
import Product from '../models/product.js';
import { createError } from '../error.js';
import cloudinary from 'cloudinary';

//  signup user
// const createProductNo = async (req, res, next) => {
// 	try {
// 		const alreadyHave = await Product.findOne({ title: req.body.title });
// 		if (alreadyHave) return next(createError(404, 'Product already exits !'));

// 		const newProduct = new Product({ ...req.body });

// 		await newProduct.save();
// 		//res.status(200).json('Product has been Created!');
// 		res.status(200).json({
// 			newProduct,
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// };
//  signup user

// Create new product   =>   /api/v1/admin/product/new

export const createProduct = async (req, res, next) => {
	let images = [];
	if (typeof req.body.images === 'string') {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	let imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.v2.uploader.upload(images[i], {
			folder: 'products',
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
};

// const createProduct = async (req, res, next) => {
// 	const { name, brand, desc, price, image } = req.body;

// 	try {
// 		// const alreadyHave = await Product.findOne({ name: req.body.name });
// 		// if (alreadyHave) return next(createError(404, 'Product already exits !'));

// 		if (image) {
// 			const uploadedResponse = await cloudinary.uploader.upload(image, {
// 				upload_preset: 'lotus123',
// 			});

// 			if (uploadedResponse) {
// 				const product = new Product({
// 					name,
// 					brand,
// 					desc,
// 					price,
// 					image: uploadedResponse,
// 				});

// 				const savedProduct = await product.save();
// 				res.status(200).send(savedProduct);
// 			}
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		next(err);
// 	}
// };

//  todo create
export const getAllProduct = async (req, res, next) => {
	// console.log(req.user.id);
	// console.log(req.user.isAdmin);
	try {
		const allProduct = await Product.find();
		if (!allProduct) return next(createError(404, 'no Product found'));

		res.status(200).json(allProduct);
	} catch (err) {
		next(err);
	}
};

// get single product
export const getProduct = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return next(createError(401, 'product not found'));
		}
		res.status(200).json(product);
	} catch (err) {
		next(err);
	}
};

// module.exports = {
// 	createProduct,
// 	getAllProduct,
// 	getProduct,
// };
