import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../context/PostContext";
import Post from "../../components/Post";

const Home = () => {
	const { posts, setPosts } = useContext(PostContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(async () => {
			// Grab all post
			const data = await getPosts();
			// console.log(data);
			// Update posts state
			setPosts(data.posts);
			// Remove the loading
			setLoading(false);
		}, 1000);
	}, []);

	console.log(posts);
	return (
		<section className="card">
			<h1 className="title">Latest Posts</h1>

			{loading && (
				<i
					className="fa-solid fa-spinner animate-spin text-3xl text-center block
            "
				></i>
			)}
			{posts &&
				posts.map((post) => (
					<div key="post._id " className="">
						<Post post={post} />
					</div>
				))}
		</section>
	);
};

export default Home;
