const Joi = require('joi');
const mongoose = require('mongoose');
const Test = require('../models/testMe');

// insert data
const insertData = async (req, res) => {
	try {
		const schema = Joi.object({
			title: Joi.string().min(3).max(300).required(),
			otherText: Joi.string().min(3).max(300).required(),
			mobile_no: Joi.string().min(3).max(300).required(),
			isComplete: Joi.boolean(),
			date: Joi.date(),
		});

		const { error } = schema.validate(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		const { title, otherText, mobile_no } = req.body;

		let goal = new Test({ title, otherText, mobile_no });

		goal = await goal.save();

		res.json(goal);
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
};

module.exports = {
	insertData,
};
