import express from "express";
import {
	addPost,
	deletePost,
	getUserPosts,
	getPosts,
	updatePost,
} from "../controllers/postsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// get all post
router.get("/", getPosts);

// get all user post
router.get("/user", auth, getUserPosts);

// add new post
router.post("/", auth, addPost);

// delete post
router.delete("/:id", auth, deletePost);

// update  post
router.put("/:id", auth, updatePost); // put change everything. patch change the affcted field

export { router as postsRoutes };
