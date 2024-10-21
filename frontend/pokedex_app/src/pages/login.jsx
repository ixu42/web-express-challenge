import React from "react";
import background from "../assets/8k.jpg"
import LoginForm from "../components/LoginForm.jsx"
import RegistrationForm from "../components/RegistrationForm.jsx"

const Login = () => {

	return (
	<main className="h-screen bg-cover bg-center" >
	<div className="flex h-screen">
	<div className="opacity-60 w-full max-w-md m-auto bg-gray-400 rounded p-5">
		<LoginForm />
		<RegistrationForm  />
	</div>
	</div>
	</main>
	)
}

export default Login;