const pokemonService = require("../services/pokemonService");
const pokemonModel = require("../models/pokemonModel");

const fetchPokemons = async (req, res) => {
  try {
    const pokemonsPage = await pokemonService.fetchPokemons();
    const pokemons = await Promise.all(
      pokemonsPage.map((pokemon) => pokemonService.fetchPokemon(pokemon.name))
    );
    const savedPokemons = pokemons.map((pokemon) =>
      pokemonModel.savePokemon(pokemon)
    );
    await Promise.all(savedPokemons);
    res.status(200).send("Pokémon data successfully saved to database");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving Pokémon data to the database");
  }
};

const fetchPokemon = async (req, res) => {
  try {
    const pokemon = await pokemonModel.getPokemon();

    res.status(200).json(pokemon); // Send the database data as a response
  } catch (error) {
    res.status(500).send("Error fetching Pokémon data from the database");
  }
};

module.exports = {
  fetchPokemons,
  fetchPokemon,
};
