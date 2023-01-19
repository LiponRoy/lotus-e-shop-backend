// const mongoose = require('mongoose');
// const Product = require('../models/product');
// const { createError } = require('../error.js');
// const cloudinary = require('../utils/cloudinary');
// const Goal = require('../models/Goal');

// //  signup user
// // const createProductNo = async (req, res, next) => {
// // 	try {
// // 		const alreadyHave = await Product.findOne({ title: req.body.title });
// // 		if (alreadyHave) return next(createError(404, 'Product already exits !'));

// // 		const newProduct = new Product({ ...req.body });

// // 		await newProduct.save();
// // 		//res.status(200).json('Product has been Created!');
// // 		res.status(200).json({
// // 			newProduct,
// // 		});
// // 	} catch (err) {
// // 		next(err);
// // 	}
// // };
// //  signup user

// // Create new product   =>   /api/v1/admin/product/new

// const test_Pro = async () => {
// 	try {
// 		const schema = Joi.object({
// 			title: Joi.string().min(3).max(300).required(),
// 			otherText: Joi.string().min(3).max(300).required(),
// 			mobile_no: Joi.string().min(3).max(300).required(),
// 			isComplete: Joi.boolean(),
// 			date: Joi.date(),
// 		});

// 		const { error } = schema.validate(req.body);

// 		if (error) return res.status(400).send(error.details[0].message);

// 		const { title, otherText, mobile_no } = req.body;

// 		let goal = new Goal({ title, otherText, mobile_no });

// 		goal = await goal.save();

// 		res.json(goal);
// 	} catch (error) {
// 		console.log(error.message);
// 		res.status(500).send(error.message);
// 	}
// };

// const createProduct = async (req, res, next) => {
// 	let images = [];
// 	if (typeof req.body.images === 'string') {
// 		images.push(req.body.images);
// 	} else {
// 		images = req.body.images;
// 	}

// 	let imagesLinks = [];

// 	for (let i = 0; i < images.length; i++) {
// 		const result = await cloudinary.v2.uploader.upload(images[i], {
// 			folder: 'products',
// 		});

// 		imagesLinks.push({
// 			public_id: result.public_id,
// 			url: result.secure_url,
// 		});
// 	}

// 	req.body.images = imagesLinks;
// 	req.body.user = req.user.id;

// 	const product = await Product.create(req.body);

// 	res.status(201).json({
// 		success: true,
// 		product,
// 	});
// };

// // const createProduct = async (req, res, next) => {
// // 	const { name, brand, desc, price, image } = req.body;

// // 	try {
// // 		// const alreadyHave = await Product.findOne({ name: req.body.name });
// // 		// if (alreadyHave) return next(createError(404, 'Product already exits !'));

// // 		if (image) {
// // 			const uploadedResponse = await cloudinary.uploader.upload(image, {
// // 				upload_preset: 'lotus123',
// // 			});

// // 			if (uploadedResponse) {
// // 				const product = new Product({
// // 					name,
// // 					brand,
// // 					desc,
// // 					price,
// // 					image: uploadedResponse,
// // 				});

// // 				const savedProduct = await product.save();
// // 				res.status(200).send(savedProduct);
// // 			}
// // 		}
// // 	} catch (error) {
// // 		console.log(error);
// // 		next(err);
// // 	}
// // };

// //  todo create
// const getAllProduct = async (req, res, next) => {
// 	// console.log(req.user.id);
// 	// console.log(req.user.isAdmin);
// 	try {
// 		const allProduct = await Product.find();
// 		if (!allProduct) return next(createError(404, 'no Product found'));

// 		res.status(200).json(allProduct);
// 	} catch (err) {
// 		next(err);
// 	}
// };

// // get single product
// const getProduct = async (req, res, next) => {
// 	try {
// 		const product = await Product.findById(req.params.id);
// 		if (!product) {
// 			return next(createError(401, 'product not found'));
// 		}
// 		res.status(200).json(product);
// 	} catch (err) {
// 		next(err);
// 	}
// };

// module.exports = {
// 	createProduct,
// 	getAllProduct,
// 	getProduct,
// 	test_Pro,
// };
