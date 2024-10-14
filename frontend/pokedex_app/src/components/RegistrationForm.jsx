import React from "react";
import { useState } from "react";

const RegistrationForm = (props) => {

	const [username, setUsername] = useState('');
	const [user, setUser] = useState([]);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('')


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
		
		<section>
			<header>Don't have an account yet? Register here</header>
			<form onSubmit={loginAttempt}>
				<div>
					Email address: <input value={email}  onChange={handleEmail}/>
				</div>
				<div>
					Username: <input value={username} onChange={handleUsername}/>
				</div>
				<div>
					Password: <input value={password} onChange={handlePassword}/>
				</div>
			<button type="submit">Register</button>
			</form>
		</section>
	)
}

export default RegistrationForm;