import { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { createPost } from "../../controllers/postsController";
import { PostContext } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
	// Use post contect
	const { posts, setPosts } = useContext(PostContext);

	// Error state
	const [error, setError] = useState(null);

	// Use navigate hook
	const navigate = useNavigate();

	// Form Data
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleCreate = async (e) => {
		e.preventDefault();
		// console.log(title, body);

		try {
			// Create the post
			const data = await createPost(title, body);

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
			<h1 className="title">Create a Post</h1>
			<form onSubmit={handleCreate}>
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
				<button className="btn w-full">Create </button>
			</form>
			{error && <Alert msg={error} />}
		</section>
	);
};

export default Create;
