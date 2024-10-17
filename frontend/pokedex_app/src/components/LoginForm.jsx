import React from "react";
import { useState } from "react";

const LoginForm = (props) => {

	const [username, setUsername] = useState('');
	const [user, setUser] = useState([]);
	const [password, setPassword] = useState('');
	const [pwordVisibility, setPwordVisibility] = useState(false);


	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const loginAttempt = (event) => {
		event.preventDefault()
		const userInfo = {
			username: username,
			password: password
		}
		fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		})
		.then((response) => {
			if (response.status === 400)
			{
				alert("Both username and password are required")
			}
			else if (response.status === 401)
			{
				alert("Invalid username or password")
			}
			else if (response.status === 500)
			{
				alert("Error logging in")
			}
			else
			{
				alert("Logged in successfully!")
			}
			})
		.catch((error) => alert("Error registering user"))
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
					<input id="username" autoComplete="on" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" value={username}  onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="password">Password:</label>
					<input id="password" autoComplete="on" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type={
						pwordVisibility	?	"text"	:	"password"
					} value={password} onChange={handlePassword}/>
					<div>
						<label htmlFor="show-password">Show password? </label>
						<input id="show-password" type="checkbox" value={pwordVisibility} onChange={() => setPwordVisibility((previous) => !previous)}/>
					</div>
				</div>
			<button className="w-full text-2xl font-pokemon bg-pink-700 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded" type="submit">Log in</button>
			</form>
		</section>
	)
}

export default LoginForm;