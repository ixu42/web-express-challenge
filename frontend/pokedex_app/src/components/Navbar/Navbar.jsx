import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = () => {
	return (
		<>
			<nav className="h-16 bg-rose-900 text-center">
				<div className="font-sans text-zinc-700 text-3xl py-5 flex justify-evenly">
          <NavLink to="/Profile">
						My Profile
					</NavLink>
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