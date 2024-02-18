import mongoose from "mongoose";
import Post from "../models/PostsModel.js";
import User from "../models/usersModel.js";

/*******************Get all Posts ****************/
const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: "desc" });
		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/*******************Get all Posts for a user ****************/
const getUserPosts = async (req, res) => {
	// Grab authenticated user from request body
	const user = await User.findById(req.user._id);
	try {
		const userPosts = await Post.find({ userId: user._id }).sort({
			createdAt: "desc",
		});
		res.status(200).json({ userPosts, email: user.email });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**********************Create New Post ************ */

const addPost = async (req, res) => {
	// grab data from request body
	const { title, body } = req.body;

	// res.json(req.user);

	// check that fields are not empty
	if (!title || !body) {
		return res.status(400).json({ error: "All 00000 fields are required" });
	}

	// Grab authenticated user from request body
	{
		// const { _id } = req.user;
		// _id from auth
		// {
		// 	"_id": "65ce89390740568511e1243c"
		// }
	}

	const user = await User.findById(req.user._id);
	try {
		const post = await Post.create({
			userId: user._id,
			title,
			body,
		});
		res.status(200).json({ success: "Post created successfully", post });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**********************Delete  Post ************ */

const deletePost = async (req, res) => {
	// res.send(req.params);
	// check the id is valid type
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ error: "Incorrect ID" });
	}

	// check if post exists
	const post = await Post.findById(req.params.id);
	if (!post) {
		return res.status(400).json({ error: "Post not found" });
	}

	// check the user owns the post
	const user = await User.findById(req.user._id);
	if (!post.userId.equals(user._id)) {
		return res.status(401).json({ error: " Not Authorized" });
	}

	try {
		await post.deleteOne();
		res.status(200).json({ success: "Post was deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**********************Uppate Post ************ */

const updatePost = async (req, res) => {
	// grab updated data from request body
	const { title, body } = req.body;

	// check that fields are not empty
	if (!title || !body) {
		return res.status(400).json({ error: "All fields are required" });
	}
	// check the id is valid type
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ error: "Incorrect ID" });
	}

	// check if post exists
	const post = await Post.findById(req.params.id);

	if (!post) {
		return res.status(400).json({ error: "Post not found" });
	}

	// check the user owns the post
	const user = await User.findById(req.user._id);
	if (!post.userId.equals(user._id)) {
		return res.status(401).json({ error: "Not Authorized" });
	}

	try {
		await post.updateOne({
			title,
			body,
		});
		res.status(200).json({ success: "Post was updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { getPosts, getUserPosts, addPost, deletePost, updatePost };
