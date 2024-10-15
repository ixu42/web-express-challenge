import React from "react";
import { useState } from "react";

const RegistrationForm = (props) => {

	const [username, setUsername] = useState('');
	const [user, setUser] = useState([]);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('')
	const [pwordVisibility, setPwordVisibility] = useState(false);



	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const loginAttempt = (event) => {
		event.preventDefault()
		console.log(`Registration attempt: ${username}, ${password}, ${email}`)
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
			<form onSubmit={loginAttempt}>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-email">Email address:</label>
					<input id="register-email" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type="email" value={email}  onChange={handleEmail}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-username">Username:</label>
					<input id="register-username" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" value={username} onChange={handleUsername}/>
				</div>
				<div>
					<label className="block mb-2 text-black" htmlFor="register-password">Password:</label>
					<input id="register-password" className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300" type={
						pwordVisibility	?	"text"	:	"password"
					} value={password} onChange={handlePassword}/>
				</div>
				<div>
					<label htmlFor="show-password">Show password? </label>
					<input id="show-password" type="checkbox" value={pwordVisibility} onChange={() => setPwordVisibility((previous) => !previous)}/>
				</div>
			<button className="font-pokemon w-full text-2xl bg-pink-700 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded" type="submit">Register</button>
			</form>
		</section>
	)
}

export default RegistrationForm;