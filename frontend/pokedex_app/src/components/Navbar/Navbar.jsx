import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = () => {
	return (
<<<<<<< HEAD
		<>
			<nav className="h-24 bg-rose-900 text-center">
				<div className="font-pokemon text-zinc-700 text-6xl py-5 flex justify-evenly">
					<NavLink to="/Profile">
						My Profile
					</NavLink>
					<NavLink to="/">
						Pokedex
					</NavLink>
					<NavLink to="/Login">
						Login | Signup
=======
		<div>
			<Nav>
				<NavMenu>
					<NavLink to="/">
						Pokédex
					</NavLink>
					<NavLink to="/Profile">
						My Profile
					</NavLink>
					<NavLink to="/Login">
						Log in / Sign-up
>>>>>>> 485e7caab21446c261e3b4416cdf03ea3f4d6131
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Navbar