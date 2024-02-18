import React, { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Login = () => {
	// Use user context
	const { setUser } = useContext(UserContext);

	// use navigate hook
	const navigate = useNavigate();

	// Error state
	const [error, setError] = useState(null);

	// Form data state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Handle Login
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Login the user
			await loginUser(email, password);

			// Update user state
			setUser({ email, posts: [] });

			// Navigate to the Dashboard
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card ">
			<h1 className="title">Login to your account</h1>

			<form onSubmit={handleLogin} className="">
				<input
					type="email"
					placeholder="Email Address"
					className="input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
				/>

				<input
					type="password"
					placeholder="Password"
					className="input"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn">Login</button>
			</form>
			{error && <Alert msg={error} />}
		</section>
	);
};

export default Login;
