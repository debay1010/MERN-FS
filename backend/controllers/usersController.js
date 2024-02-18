import mongoose from "mongoose";
import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

/*******************Creating JWT Token ****************/
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

/*******************Register user ****************/

const registerUser = async (req, res) => {
	// Grab registration data from request body
	const { email, password } = req.body;

	// check if fields are not empty
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	// Check if email already exists
	const exist = await User.findOne({ email });

	if (exist) {
		res.status(400).json({ error: "email already exists" });
	}

	// Hash the password
	const salt = await bcrypt.genSalt();
	const hashed = await bcrypt.hash(password, salt);

	try {
		// Register the user
		const user = await User.create({ email, password: hashed });

		// Create json web token
		const token = createToken(user._id);

		// Send the response
		// res.status(200).json({
		// 	success: "User creation successful",
		// 	email,
		// 	token,
		// });
		res.status(200).json({
			success: "User creation successful",
			email,
			token,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/*******************Login user ****************/

const loginUser = async (req, res) => {
	// Grab registration data from request body
	const { email, password } = req.body;

	// check if fields are not empty
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	// Check if email already exists
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({ error: "Incorrect email" });
	}
	// check password
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		return res.status(400).json({ error: "Incorrect password" });
	}

	try {
		// Create json web token
		const token = createToken(user._id);

		res.status(200).json({ success: "Login successful", email, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { registerUser, loginUser };
