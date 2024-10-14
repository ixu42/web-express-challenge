import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx"
import RegistrationForm from "../components/RegistrationForm.jsx"

const Login = () => {

	return (
	<main>
		<header>Login</header>
		<LoginForm />
		<RegistrationForm  />
	</main>
	)
}

export default Login;