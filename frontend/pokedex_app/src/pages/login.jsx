import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx"

const Login = () => {

	const [signupUsername, setSignupUsername] = useState();

	return (
	<main>
		<header>Login</header>
		<LoginForm />
		<header>Don't have an account yet?</header>
		<p>Fill out this form to register</p>
	</main>
	)
}

export default Login;