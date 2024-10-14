import React from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements"

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/Profile">
						My Profile
					</NavLink>
					<NavLink to="/">
						Pokedex
					</NavLink>
					<NavLink to="/Login">
						Log in / Sign-up
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar