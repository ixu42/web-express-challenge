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
		<section>
			<form onSubmit={loginAttempt}>
				<div>
					<label>Username:</label>
					<input value={username}  onChange={handleUsername}/>
				</div>
				<div>
					<label>Password:</label>
					<input value={password} onChange={handlePassword}/>
				</div>
			<button type="submit">Log in</button>
			</form>
		</section>
	)
}

export default LoginForm;