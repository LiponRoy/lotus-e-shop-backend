import mongoose from 'mongoose';
import crypto from 'crypto';

const AuthSchema = new mongoose.Schema(
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
		isAdmin: {
			type: Boolean,
			default: false,
		},

		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{ timestamps: true },
);

// for reset password
AuthSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token (private key) and save to database
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// Set token expire date
	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

	return resetToken;
};

export default mongoose.model('lotus-e-shop-User', AuthSchema);
