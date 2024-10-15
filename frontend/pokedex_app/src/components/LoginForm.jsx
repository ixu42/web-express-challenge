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
			<header className="font-pokemon w-28 mx-auto mb-5 font-bold text-pink-950 text-5xl">Login</header>
			<form onSubmit={loginAttempt}>
				<div>
					<label className="block mb-2 text-black" htmlFor="username">Username:</label>
					<input autoComplete="on" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" value={username}  onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="password">Password:</label>
					<input autoComplete="on" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type="password" value={password} onChange={handlePassword}/>
				</div>
			<button className="w-full text-2xl font-pokemon bg-pink-700 hover:bg-pink-950 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Log in</button>
			</form>
		</section>
	)
}

export default LoginForm;