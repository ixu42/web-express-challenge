import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = () => {
	return (
		<>
			<nav className="h-16 bg-transparent text-center">
				<div className="font-sans text-zinc-700 text-xl py-2 flex justify-evenly">
					<NavLink to="/">
						Pokedex
					</NavLink>
					<NavLink to="/Profile">
						My Profile
					</NavLink>
					<NavLink to="/Login">
						Login | Signup
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Navbar