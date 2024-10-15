import React, { useState, useEffect } from "react";
import logo from '../../img/logo.png';

const Pokedex = () => {
	const [pokemonList, setPokemonList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	// const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [MorePokemon, setMorePokemon] = useState(true);
  const [matchingList, setMatchingList] = useState([]);

	const limit = 5; // Number of Pokémon per page

	const fetchPokemonList = async () => {
    console.log("fetchPokemonList() called")
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

	const searchPokemon = async (query) => {
    console.log("searchPokemon() called")
		setLoading(true);
		try {
			const response = await fetch(`/api/pokemon/search/${query}?limit=${limit}&offset=${offset}`);
			if (response.ok) {
				const newMatchingList = await response.json();
        console.log("matchingList", matchingList)
        console.log("newMatchingList", newMatchingList)

        if (newMatchingList.length < limit) {
          setMorePokemon(false);
			}
			setMatchingList(prevList => [...prevList, ...newMatchingList])
      console.log("matchingList...", matchingList)
			} else {
				setMatchingList([]); // Clear the list if no Pokémon found
			}
		} catch (error) {
			console.error("Error searching Pokémon:", error);
		} finally {
			setLoading(false);
		}
	};

	const loadMorePokemon = () => {
    console.log("loadMorePokemon")
    setOffset(prevOffset => prevOffset + limit);
	};

	useEffect(() => {
    console.log("useEffect() called")
		if (searchTerm) {
      if (pokemonList) {
        setPokemonList([]);
      }
			// Call the search function if there is a search term
			searchPokemon(searchTerm);
		} else {
      if (matchingList) {
        setMatchingList([]);
      }
			// Fetch the list if there is no search term
			fetchPokemonList();
		}
	}, [searchTerm, offset]); // Trigger fetch based on searchTerm and offset

	return (
	<div>
		<header>
			<img alt="react logo" className="logo" src={logo} />
		</header>
		<main>
			<div className="search-container">
				<input
					className="search-box"
					type="text"
					placeholder="Search..."
					value={searchTerm} // Set input value to the search term
					onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
				/>
			</div>
			{!searchTerm && (<ul>
        {pokemonList.map((pokemon) => (
			 		<li key={pokemon.name} className="pokemon-item">
						<a href={`/pokemon/${pokemon.name}`} onClick={() => pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ul>)}
      {searchTerm && (<ul>
        {matchingList.map((pokemon) => (
			 		<li key={pokemon.name} className="pokemon-item">
						<a href={`/pokemon/${pokemon.name}`} onClick={() => pokemon.url}>{pokemon.name}</a>
					</li>
				))}
			</ul>)}
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