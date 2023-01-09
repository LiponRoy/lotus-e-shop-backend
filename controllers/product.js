const mongoose = require('mongoose');
const Product = require('../models/Product');
const { createError } = require('../error.js');

//  signup user
const createProduct = async (req, res, next) => {
	try {
		const alreadyHave = await Product.findOne({ title: req.body.title });
		if (alreadyHave) return next(createError(404, 'Product already exits !'));

		const newProduct = new Product({ ...req.body });

		await newProduct.save();
		//res.status(200).json('Product has been Created!');
		res.status(200).json({
			newProduct,
		});
	} catch (err) {
		next(err);
	}
};

//  todo create
const getAllProduct = async (req, res, next) => {
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
