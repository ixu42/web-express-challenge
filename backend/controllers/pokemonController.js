const pokemonService = require("../services/pokemonService");
const pokemonModel = require("../models/pokemonModel");
const axios = require('axios')
const { fetchAllPokemon, shufflePokemon, sortPokemon, getValidImgUrl, addImgUrlToPokemonDetails } = require('./pokemonControllerUtils');

// cache for pokemon list
let pokemonList = null;

// If a fetched pokemon img is invalid, fall back to default img
const defaultPokemonImgUrl = '../img/default_pokemon.png'

const likedPokemon = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { pokemon_id, pokemon_name } = req.body;
    const pokemon = await pokemonService.likedPokemon(
      id,
      pokemon_id,
      pokemon_name
    );
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

const unlikePokemon = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { pokemon_id } = req.params;
    const pokemon = await pokemonService.unlikePokemon(id, pokemon_id);
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

const dislikedPokemon = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { pokemon_id, pokemon_name } = req.body;
    const pokemon = await pokemonService.dislikedPokemon(
      id,
      pokemon_id,
      pokemon_name
    );
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

const undislikePokemon = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const { pokemon_id } = req.params;
    const pokemon = await pokemonService.undislikePokemon(id, pokemon_id);
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

/* FETCH FROM EXTERNAL API */

// Fetch a list of Pokemon
const getPokemon = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20  // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // How many Pokémon to skip
  const sort = req.query.sort // Sort order, if "", no sorting
  const shuffle = req.query.shuffle === 'true'; // Check if shuffle is requested
  console.log("/api/pokemon, limit:", limit, "offset:", offset, "sortorder:", sort, "shuffle:", shuffle)
  
  try {
    if (offset === 0) {
      pokemonList = await fetchAllPokemon();

      // If shuffle is requested or there's no cached shuffled list, reshuffle
      if (shuffle) {
        pokemonList = shufflePokemon(pokemonList);
      }

      // Sort the Pokémon list based on the sort parameter
      if (sort !== "") {
        pokemonList = sortPokemon(pokemonList, sort);
      }
    }

    const paginatedPokemonList = pokemonList.slice(offset, offset + limit); 
    const detailedPokemonList = await addImgUrlToPokemonDetails(paginatedPokemonList);

    res.json(detailedPokemonList)
  } catch (err) {
    console.error('Error in fetching Pokémon:', err.message);
    res.status(500).json({ 'error': 'Error fetching Pokémon data' })
  }
}

// Fetch a list of Pokémon based on a substring match
const getMatchingPokemon = async (req, res) => {
  const { query } = req.params
  const limit = parseInt(req.query.limit) || 20  // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // How many Pokémon to skip
  const sort = req.query.sort // Sort order, if "", no sorting
  console.log("/api/pokemon/search/:query?")
  console.log("query:", query, "limit:", limit, "offset:", offset, "sort", sort)

  try {
    if (offset === 0) {
      // Fetch a full pokemon list
      pokemonList = await fetchAllPokemon();

      // Get a list of matching pokemon
      if (query && query.trim() !== "") {
        pokemonList = pokemonList.filter(pokemon => pokemon.name.includes(query.toLowerCase()))
        if (pokemonList.length === 0) {
          return res.json([])
        }
      }

      // Sort the list, if requested
      if (sort !== "") {
        pokemonList = sortPokemon(pokemonList, sort);
      }
    }

    const paginatedPokemonList = pokemonList.slice(offset, offset + limit);
    const detailedPokemonList = await addImgUrlToPokemonDetails(paginatedPokemonList);

    res.json(detailedPokemonList)
  } catch (err) {
    console.error(err)
    if (err.response) {
      // The request was made and the server responded with a status code
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.' })
    }
  }
}

// Fetch all Pokémon types
const getPokemonTypes = async (req, res) => {
  console.log("/api/pokemon/type/")
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/`)
    res.json(response.data.results)
  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon types not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon types.'})
    }
  }
}

// A list of Pokémon by type
const getPokemonByType = async (req, res) => {
  const { type } = req.params
  console.log("/api/pokemon/type/:type?, type:", type)
  try {
    if (!type || type.trim() === "") {
      return res.status(404).json({ 'error': 'Type not provided.' })
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)

  // Extract a list of Pokémon of a given type
  // could add image key-value pair to each pokemon (check getPokemonByName)
  const typePokemon = response.data.pokemon.map(p => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }))

  res.json(typePokemon)

  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
}

// Details of a Pokémon by name
const getPokemonByName = async (req, res) => {
  const { name } = req.params
  console.log("/api/pokemon/:name?, name:", name)
  try {
    if (!name || name.trim() === "") {
      return res.status(404).json({ 'error': 'Name not provided.' })
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemonData = response.data
    const validImageUrl = await getValidImgUrl(pokemonData.id)
    const pokemonWithValidImage = {
      ...pokemonData,
      image: validImageUrl
    }
    res.json(pokemonWithValidImage)
  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
}

module.exports = {
  likedPokemon,
  unlikePokemon,
  dislikedPokemon,
  undislikePokemon,
  getMatchingPokemon,
  getPokemon,
  getPokemonTypes,
  getPokemonByType,
  getPokemonByName
};
