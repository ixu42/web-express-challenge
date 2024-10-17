import React, { useState, useEffect } from "react";
import logo from '../../img/logo.png';
import './pokedex.css';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [morePokemon, setMorePokemon] = useState(true);
  const [matchingList, setMatchingList] = useState([]);
  const [offsetForSearching, setOffsetForSearching] = useState(0);

  const limit = 20; // Number of Pokémon per page

  console.log("rendering Pokedex...");

  // Function to fetch Pokemon list (non-search)
  const fetchPokemonList = async () => {
    console.log("fetchPokemonList() called");
    setLoading(true);
    try {
      console.log("offset:", offset);
      const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`);
      const newPokemonList = await response.json();
      console.log("newPokemonList:", newPokemonList)
      if (newPokemonList.length < limit) {
        setMorePokemon(false);
      }
      setPokemonList((prevList) => [...prevList, ...newPokemonList]);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to search for Pokemon
  const searchPokemon = async (query) => {
    console.log("searchPokemon() called");
    setLoading(true);
    try {
      const response = await fetch(`/api/pokemon/search/${query}?limit=${limit}&offset=${offsetForSearching}`);
      if (response.ok) {
        const newMatchingList = await response.json();
        console.log("newMatchingList:", newMatchingList)
        if (newMatchingList.length < limit) {
          setMorePokemon(false);
        }
        setMatchingList(prevList => [...prevList, ...newMatchingList])
      } else {
        setMatchingList([]);
        setMorePokemon(false);
      }
    } catch (error) {
      console.error("Error searching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = () => {
    console.log("loadMorePokemon");
    if (searchTerm === "") {
      setOffset((prevOffset) => prevOffset + limit);
    } else {
      setOffsetForSearching((prevOffset) => prevOffset + limit);
    }
  };

  const updateList = (userInput) => {
    console.log("updateList() called, userInput:", userInput);
    setSearchTerm(userInput);
    setOffset(0);
    setOffsetForSearching(0);
    setMorePokemon(true);
    setPokemonList([]);
    setMatchingList([]);
    if (userInput === "") {
      fetchPokemonList();
    } else {
      if (offsetForSearching === 0) {
        searchPokemon(userInput);
      }
    }
  };

  useEffect(() => {
    fetchPokemonList(); // Fetch pokemonList in non-search mode
  }, [offset]); // Run when offset changes

  useEffect(() => {
    searchPokemon(searchTerm); // Fetch matchingList in search mode
  }, [offsetForSearching]); // Run when offsetForSearching changes

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
            onChange={(e) => updateList(e.target.value)}
          />
        </div>

        {/* List of Pokémon when not searching */}
        {!searchTerm && (
          <ul className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name} className="pokemon-item">
                <a href={`/pokemon/${pokemon.name}`}>
                  <img 
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <p>{pokemon.name}</p>
                </a>
              </li>
            ))}
        </ul>
        )}

        {/* Matching Pokémon list when searching */}
        {searchTerm && (
          <>
            {matchingList && matchingList.length > 0 ? (
              <ul className="pokemon-list">
                {matchingList.map((pokemon) => (
                  <li key={pokemon.name} className="pokemon-item">
                    <a href={`/pokemon/${pokemon.name}`}>
                      <img 
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="pokemon-image"
                      />
                    {pokemon.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p align='center'>No Pokémon matched your search</p>
            )}
          </>
        )}

        {/* Load more button (placed before the list for testing purpose)*/}
        {morePokemon && (
          <button
            onClick={loadMorePokemon}
            disabled={loading}
            className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
          >
            {loading ? "Loading..." : "Load More Pokémon"}
          </button>
        )}

      </main>
    </div>
  );
};

export default Pokedex;