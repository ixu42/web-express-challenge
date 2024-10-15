import React, { useState, useEffect } from "react";
import logo from '../../img/logo.png';

const Pokedex = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonInfo, setPokemonInfo] = useState(null);
	// const [searchTerm, setSearchTerm] = useState("");
	// const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [MorePokemon, setMorePokemon] = useState(true);

	const limit = 40; // Number of Pokémon per page

	const fetchPokemonList = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`);
			const newPokemonList = await response.json();
			if (newPokemonList.length < limit) {
				setMorePokemon(false);
			}
			setPokemonList(prevList => [...prevList, ...newPokemonList]);
		} catch (error) {
			console.error("Error fetching Pokemon:", error);
		} finally {
			setLoading(false);
		}
	};

	const loadMorePokemon = () => {
		setOffset(prevOffset => prevOffset + limit);
	};

	useEffect(() => {
		fetchPokemonList();
	}, [offset]);

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
			 		<li key={pokemon.name} className="pokemon-item">
						<a href={`/pokemon/${pokemon.name}`} onClick={() => pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ul>
		</main>
		{MorePokemon && (<button
			onClick={loadMorePokemon}
			disabled={loading}
			className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
				${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
		>
			{loading ? "Loading..." : "Load More Pokémon"}
		</button>)}
	</div>
	)
}

export default Pokedex;