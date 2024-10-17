const axios = require("axios");

const getPokemonById = async (id) => {
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
  getPokemonById,
};
