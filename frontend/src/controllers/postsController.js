/*****************************Get All posts *************************/
const getPosts = async () => {
	const res = await fetch("/api/posts");
	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

/*****************************Get All User posts *************************/
const getUserPosts = async () => {
	const res = await fetch("/api/posts/user", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const data = await res.json();
	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

/*****************************Create Post *************************/
import React from "react";

const createPost = async (title, body) => {
	if (!title || !body) {
		throw Error("All fields are required");
	}
	const res = await fetch("/api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ title, body }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

/*****************************Delete Post *************************/

const deletePost = async (_id) => {
	const res = await fetch(`/api/posts/${_id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

/*****************************Update Post *************************/
const updatePost = async (_id, title, body) => {
	if (!title || !body) {
		throw Error("All fields are required");
	}

	const res = await fetch(`/api/posts/${_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ title, body }),
	});
	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};
export { getPosts, getUserPosts, createPost, deletePost, updatePost };
