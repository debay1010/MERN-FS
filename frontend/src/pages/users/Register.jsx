import React, { useContext, useState } from "react";
import Alert from "../../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../controllers/usersController";
import { UserContext } from "../../context/UserContext";

const Register = () => {
	// use user state
	const { setUser } = useContext(UserContext);

	// use navigate hook
	const navigate = useNavigate();

	// Error state
	const [error, setError] = useState(null);

	// Form data state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	// Handle Login
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			// Register user
			await registerUser(
				formData.email,
				formData.password,
				formData.confirmPassword
			);
			// Update the user state
			setUser({ email: formData.email, posts: [] });

			// Navigate to the Dashboard
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card ">
			<h1 className="title">Create new account</h1>

			<form onSubmit={handleRegister} className="">
				<input
					type="email"
					placeholder="Email Address"
					className="input"
					value={formData.email}
					onChange={(e) =>
						setFormData({ ...formData, email: e.target.value })
					}
					autoFocus
				/>

				<input
					type="password"
					placeholder="Password"
					className="input"
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					className="input"
					value={formData.passwordConfirm}
					onChange={(e) =>
						setFormData({
							...formData,
							confirmPassword: e.target.value,
						})
					}
				/>
				<button className="btn">Register</button>
			</form>
			<p>
				<span>Already registered?</span>
				<Link title="Login" to="/login">
					Login
				</Link>
			</p>

			{error && <Alert msg={error} />}
		</section>
	);
};

export default Register;
