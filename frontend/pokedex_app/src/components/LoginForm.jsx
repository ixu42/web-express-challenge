import React from "react";
import { useState } from "react";

const LoginForm = (props) => {

	const [username, setUsername] = useState('');
	const [user, setUser] = useState([]);
	const [password, setPassword] = useState('');
	const [signupUsername, setSignupUsername] = useState();


	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const loginAttempt = (event) => {
		event.preventDefault()
		console.log(`Login attempt: ${username}, ${password}`)
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	return (
		<section className="">
			<header className="font-pokemon w-28 mx-auto mb-5 font-bold text-blue-700 text-5xl">Login</header>
			<form onSubmit={loginAttempt}>
				<div>
					<label className="block mb-2 text-indigo-500" for="username">Username:</label>
					<input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" value={username}  onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-indigo-500" for="password">Password:</label>
					<input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" value={password} onChange={handlePassword}/>
				</div>
			<button className="w-full text-2xl font-pokemon bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Log in</button>
			</form>
		</section>
	)
}

export default LoginForm;