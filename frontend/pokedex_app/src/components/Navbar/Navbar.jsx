import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = () => {
	return (
		<>
			<nav className="h-24 bg-rose-900 text-center">
				<div className="font-bold font-pokemon text-zinc-800 text-6xl py-5 flex justify-evenly">
					<NavLink to="/Profile">
						My Profile
					</NavLink>
					<NavLink to="/">
						Pokedex
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