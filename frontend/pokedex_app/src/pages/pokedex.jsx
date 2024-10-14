import React from "react";
import logo from '../../img/logo.png';

const Pokedex = () => {
	const [pokemonList, setPokemonList] = useState([]);
	// const [searchTerm, setSearchTerm] = useState("");
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	const fetchPokemonList = async () => {
		try {
			const response = await fetch(`/api/pokemon}`);
			const data = await response.json();
			setPokemonList(data);
		} catch (error) {
			console.error("Error fetching Pokemon:", error);
		}
	};

	fetchPokemonList();

	// const showPokemon = async (url) => {
	// 	const response = await fetch(url);
	// 	const data = await response.json();
	// 	setSelectedPokemon(data);
	//   };

	return (
	<div>
		<header>
			<img alt="react logo" className="logo" src={logo} />
		</header>
		<main>
			<div className="search-container">
				<input className="search-box" type="text" placeholder="Search..." />
			</div>
			<h1>Pokémon List</h1>
			<div className="pokemon-list">
				{pokemonList.map((pokemon) => (
					<div key={pokemon.name} className="pokemon-card">
					<img
						src={selectedPokemon.sprites.other.dream_world.front_default}
						alt={pokemon.name}
					/>
					<p>{pokemon.name}</p>
					</div>
				))}
			</div>
		</main>
	</div>)
}

export default Pokedex;