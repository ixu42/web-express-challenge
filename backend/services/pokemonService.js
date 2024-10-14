const axios = require("axios");

const fetchPokemons = async () => {
  try {
    console.log("hello from fetchPokemonData");
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );
    console.log(response.data.results);
    return response.data.results; // Assuming you want only the Pokémon data
  } catch (error) {
    throw new Error("Error fetching pokemons data from PokeAPI");
  }
};

const fetchPokemon = async (NameOrId) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${NameOrId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching pokemon data from PokeAPI");
  }
};

module.exports = {
  fetchPokemons,
  fetchPokemon,
};
