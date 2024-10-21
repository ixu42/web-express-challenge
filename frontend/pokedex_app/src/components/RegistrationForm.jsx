import React from "react";
import { useState } from "react";

const RegistrationForm = (props) => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('')
	const [pwordVisibility, setPwordVisibility] = useState(false);


	/* const createProfile = () => {
		fetch("/api/profile/create")
	} */

	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const attemptRegistration = (event) => {
		event.preventDefault()
		const newUser = {
			username: username,
			password: password,
			email: email
		}
		fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
		.then((response) => {
			if (response.status === 201)
			{
				alert("Successfully registered!")
				
			}
			else if (response.status === 400)
			{
				alert("Username and password are required")
			}
			else
			{
				alert("Error registering user")
			}})
		.catch((error) => alert("Error registering user"))
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	const handleEmail = (event) => {
		setEmail(event.target.value)
	}

	return (
		
		<section className="border-t-4 border-pink-700">
			<header className="pt-4 font-pokemon w-full text-center font-bold text-pink-950 text-2xl">Don't have an account yet?<br/>Register here</header>
			<form onSubmit={attemptRegistration}>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-email">Email address:</label>
					<input autoComplete="off" id="register-email" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type="email" value={email}  onChange={handleEmail}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-username">Username:</label>
					<input autoComplete="off" id="register-username" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" value={username} onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-password">Password:</label>
					<input autoComplete="off" id="register-password" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type={
						pwordVisibility	?	"text"	:	"password"
					} value={password} onChange={handlePassword}/>
				</div>
				<div>
					<label htmlFor="show-password-register">Show password? </label>
					<input id="show-password-register" type="checkbox" value={pwordVisibility} onChange={() => setPwordVisibility((previous) => !previous)}/>
				</div>
			<button className="font-pokemon w-full text-2xl bg-pink-700 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded" type="submit">Register</button>
			</form>
		</section>
	)
}

export default RegistrationForm;