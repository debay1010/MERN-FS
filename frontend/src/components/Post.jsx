import React from "react";

const Post = ({ post, children }) => {
	return (
		<div className="mb-6">
			<div className="flex items-start justify-between">
				<div className="">
					<h2 className=" max-w-80 font-bold first-letter:uppercase text-lg text-indigo-600 first-line: ">
						{post.title}
					</h2>
					<p className="text-[10px] text-slate-500">
						{new Date(post.createdAt).toLocaleDateString()}
					</p>
				</div>
				<div className="">{children}</div>
			</div>
			<p className="text-sm mt-14b  ">{post.body}</p>
			<div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6"></div>
		</div>
	);
};

export default Post;
