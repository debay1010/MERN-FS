import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { updatePost } from "../../controllers/postsController";
import { PostContext } from "../../context/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
	// Use post contect
	const { posts, setPosts } = useContext(PostContext);

	// Error state
	const [error, setError] = useState(null);

	// Use navigate hook
	const navigate = useNavigate();
	const { state } = useLocation();

	console.log(state);

	// Form Data
	const [title, setTitle] = useState(state.title);
	const [body, setBody] = useState(state.body);

	const handleUpdate = async (e) => {
		e.preventDefault();
		// console.log(title, body);

		try {
			// Update the post
			const data = await updatePost(state._id, title, body);

			// Update the post state
			setPosts([...posts, data.post]);

			// Navigate to dashboard
			navigate("/dashboard");

			console.log(data);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card">
			<h1 className="title">Update your Post</h1>
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					placeholder="Post Title"
					className="input"
					autoFocus
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					rows={6}
					placeholder="Post Content"
					className="input"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
				<button className="btn w-full">Update </button>
			</form>
			{error && <Alert msg={error} />}
		</section>
	);
};

export default Update;
