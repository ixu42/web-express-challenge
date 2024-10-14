import React from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements"

const Navbar = () => {
	return (
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
					</NavLink>
				</NavMenu>
			</Nav>
		</div>
	);
};

export default Navbar