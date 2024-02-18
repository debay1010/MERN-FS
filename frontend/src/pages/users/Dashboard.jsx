import React, { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {
	// Use user context

	const { user, setUser } = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		setTimeout(async () => {
			// Grab user's posts
			const { email, userPosts } = await getUserPosts();
			// Update user's state
			setUser({ email, posts: userPosts });
			// Remove the Loading spin
			setLoading(false);
		}, 500);
	}, []);

	// Handle delete post
	const handleDelete = async (_id) => {
		if (confirm("Confirm Delete ?")) {
			try {
				const data = await deletePost(_id);
				setSuccess(data.success);
			} catch (error) {
				setError(error.message);
			}

			const newPosts = user.posts.filter((post) => post._id !== _id);
			setUser({ ...user, post: newPosts });
		}
	};

	return (
		<section className="card">
			<p>{user.email}</p>
			<h1 className="title">User Dashboard</h1>

			{loading && (
				<i
					className="fa-solid fa-spinner animate-spin text-3xl text-center block
            "
				></i>
			)}

			{success && <Success msg={success} />}
			{error && <Alert msg={error} />}

			{user.posts &&
				user.posts.map((post) => (
					<div key={post._id} className="">
						<Post post={post}>
							<div className=" flex space-x-3">
								<Link
									className="fa-solid fa-pen-to-square nav-link text-green-500 hover:text-green-100"
									title="Update"
									to="/update"
									state={post}
								></Link>

								<button
									className="fa-solid fa-trash nav-link text-red-500 hover:text-red-200"
									title="Delete"
									onClick={() => handleDelete(post._id)}
								></button>
							</div>
						</Post>
					</div>
				))}
		</section>
	);
};

export default Dashboard;
