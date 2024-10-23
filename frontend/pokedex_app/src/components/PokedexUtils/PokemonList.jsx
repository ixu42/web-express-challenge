import React from "react";
import { useNavigate } from 'react-router-dom';

// Pokémon List component (non-search)
const PokemonList = ({ pokemonList, offset, searchTerm, morePokemon, isFetching }) => {
  const navigate = useNavigate();

  const handlePokemonClick = (pokemon) => {
    // Capture the current scroll position before navigating
    const currentScrollPosition = window.scrollY;
    console.log("captured currentScrollPosition:", currentScrollPosition);

    // Navigate to the Pokemon profile page, passing the current state
    navigate(`/pokemon/${pokemon.name}`, {
      state: {
        from: 'pokedex',
        offset: offset,
        pokemonList: pokemonList,
        searchTerm: searchTerm,
        morePokemon: morePokemon,
        scrollPosition: currentScrollPosition
      }
    });
  };

  return (
    <div>
      {isFetching ? (
        <div className="flex justify-center mt-8">
          <p className="text-center text-2xl text-gray-600">Loading Pokémon... 🐾</p>
        </div>
      ) : (
        <ul className="pokemon-list">
          {pokemonList.map(pokemon => (
            <li key={pokemon.name} className="pokemon-item">
              <button
                onClick={() => handlePokemonClick(pokemon)}
              >
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <p className="font-semibold text-lg">{pokemon.name}</p>
                <p className="text-gray-500">ID: {pokemon.id}</p>
                <p className="text-gray-500">Types: {pokemon.types.join(', ')}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default PokemonList;