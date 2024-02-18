import express from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

mongoose
	.connect(
		"mongodb+srv://backend:Rn9lG2uwUiPpSBEL@cluster0.zyrces5.mongodb.net/demo_DB?retryWrites=true&w=majority"
	)
	.then(() => {
		app.listen(4000, "localhost", () =>
			console.log("Listening on port 4000")
		);
		console.log("Connection to DB Successful");
	})
	.catch((err) => {
		console.log(err);
	});
