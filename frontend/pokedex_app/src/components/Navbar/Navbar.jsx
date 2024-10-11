import React from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements"

const Navbar = () => {
	return (
		<div>
			<Nav>
				<NavMenu>
					<NavLink to="/Profile" activeStyle>
						My Profile
					</NavLink>
					<NavLink to="/Pokedex" activeStyle>
						Pokedex
					</NavLink>
					<NavLink to="/Login" activeStyle>
						Log in / Sign-up
					</NavLink>
				</NavMenu>
			</Nav>
		</div>
	);
};

export default Navbar