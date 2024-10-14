import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx"
import RegistrationForm from "../components/RegistrationForm.jsx"

const Login = () => {

	return (
	<main className="flex h-screen bg-indigo-700">
	<div className="w-full max-w-md m-auto bg-indigo-100 rounded p-5">
		<LoginForm />
		<RegistrationForm  />
	</div>
	</main>
	)
}

export default Login;