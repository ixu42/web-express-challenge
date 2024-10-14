import React from "react";
import logo from '../../img/logo.png';

const Pokedex = () => {

	return (
	<div>
		<header>
			<img alt="react logo" className="logo" src={logo} />
		</header>
		<main>
        <div className="search-container">
          <input className="search-box" type="text" placeholder="Search..." />
        </div>
      </main>
	</div>)
}

export default Pokedex;