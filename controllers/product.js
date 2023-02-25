const mongoose = require('mongoose');
const Product = require('../models/product.js');
const { createError } = require('../error.js');
const cloudinary = require('../utils/cloudinary.js');

//  create product
const createProduct = async (req, res, next) => {
	const { name, brand, desc, price, image } = req.body;

	try {
		if (image) {
			const uploadedResponse = await cloudinary.uploader.upload(image, {
				upload_preset: 'onlineShop',
			});

			if (uploadedResponse) {
				const product = new Product({
					name,
					brand,
					desc,
					price,
					image: uploadedResponse,
				});

				const savedProduct = await product.save();
				res.status(200).send(savedProduct);
			}
		}
	} catch (error) {
		console.log(error);
		next(err);
	}
};

//  get all product
const getAllProduct = async (req, res, next) => {
	try {
		const allProduct = await Product.find();
		if (!allProduct) return next(createError(404, 'no Product found'));

		res.status(200).json(allProduct);
	} catch (err) {
		next(err);
	}
};

// get single product
const getProduct = async (req, res, next) => {
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

module.exports = {
	createProduct,
	getAllProduct,
	getProduct,
};
