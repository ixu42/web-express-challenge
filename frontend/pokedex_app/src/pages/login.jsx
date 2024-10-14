import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx"
import RegistrationForm from "../components/RegistrationForm.jsx"

const Login = () => {

	return (
	<main lassName="flex h-screen bg-indigo-700">
	<div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
		<header className="font-bold">Login</header>
		<LoginForm />
		<RegistrationForm  />
	</div>
	</main>
	)
}

export default Login;