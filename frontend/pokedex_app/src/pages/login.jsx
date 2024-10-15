import React from "react";
import background from "../assets/8k.jpg"
import LoginForm from "../components/LoginForm.jsx"
import RegistrationForm from "../components/RegistrationForm.jsx"

const Login = () => {

	return (
	<main className="h-screen bg-cover bg-center" style={{backgroundImage: `url(${background})`}}>
	<div className="opacity-50 w-full max-w-md m-auto bg-yellow-200 rounded p-5">
		<LoginForm />
		<RegistrationForm  />
	</div>
	</main>
	)
}

export default Login;