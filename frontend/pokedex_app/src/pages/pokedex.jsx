import React, { useState } from "react";
import logo from '../../img/logo.png';

const Pokedex = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonInfo, setPokemonInfo] = useState(null);
	// const [searchTerm, setSearchTerm] = useState("");
	// const [selectedPokemon, setSelectedPokemon] = useState(null);

	const fetchPokemonList = async () => {
		try {
			const response = await fetch(`/api/pokemon`);
			const data = await response.json();
			setPokemonList(data);
		} catch (error) {
			console.error("Error fetching Pokemon:", error);
		}
	};

	fetchPokemonList();

	return (
	<div>
		<header>
			<img alt="react logo" className="logo" src={logo} />
		</header>
		<main>
			<div className="search-container">
				<input className="search-box" type="text" placeholder="Search..." />
			</div>
			<ul>
				{pokemonList.map((pokemon) => (
			 		<li key={pokemon.id} className="pokemon-item">
						<a href={`/pokemon/${pokemon.name}`} onClick={() => pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ul>
		</main>
	</div>
	)
}

export default Pokedex;