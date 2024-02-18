import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

const auth = async (req, res, next) => {
	// check if the request headers contain the authorization key
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token not found" });
	}

	// Grab the token from headers(ie, taken away the Bearer string away)
	const token = authorization.split(" ")[1];

	try {
		// Decode and extract userId from the token
		const { _id } = jwt.verify(token, process.env.JWT_SECRET);
		// Save the user in request
		req.user = await User.findById(_id).select("_id");

		next();
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};

export default auth;
