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

module.exports = {
	createProduct,
};
