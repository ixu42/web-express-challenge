const pokemonService = require("../services/pokemonService");
const pokemonModel = require("../models/pokemonModel");
const axios = require('axios')
const { extractIdFromUrl, fetchAllPokemon, shufflePokemon, sortPokemon, getValidImgUrl, addDataToPokemonList } = require('./pokemonControllerUtils');

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

// cache for pokemon list
let pokemonList = null;

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
      // if (sort !== "") {
      //   pokemonList = sortPokemon(pokemonList, sort);
      // }
      // Sort the Pokémon list based on the sort parameter
      if (sort !== "" && sort !== "likes" && sort !== "dislikes") {
        pokemonList = sortPokemon(pokemonList, sort);
      } else if (sort === "likes") {
        pokemonList = await pokemonService.sortByLikes();
      } else if (sort === "dislikes") {
        pokemonList = await pokemonService.sortByDislikes();
      }
    }

    const paginatedPokemonList = pokemonList.slice(offset, offset + limit); 
    const detailedPokemonList = await addDataToPokemonList(paginatedPokemonList);

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
  const type = req.query.type
  console.log("/api/pokemon/search/:query?")
  console.log("query:", query, "limit:", limit, "offset:", offset, "sort", sort, "type:", type)

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
      // if (sort !== "") {
      //   pokemonList = sortPokemon(pokemonList, sort);
      // }
      if (sort !== "" && sort !== "likes" && sort !== "dislikes") {
        pokemonList = sortPokemon(pokemonList, sort);
      } else if (sort === "likes") {
        pokemonList = await pokemonService.sortByLikes();
      } else if (sort === "dislikes") {
        pokemonList = await pokemonService.sortByDislikes();
      }
    }

    let listToRespond = pokemonList.slice(offset, offset + limit);
    if (type === "") {
      listToRespond = await addDataToPokemonList(listToRespond);
    }

    res.json(listToRespond)
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
  const limit = parseInt(req.query.limit) || 20  // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // How many Pokémon to skip
  const sort = req.query.sort // Sort order, if "", no sorting
  const searchTerm = req.query.searchTerm
  console.log("/api/pokemon/type/:type?, type:", type, "limit:", limit, "offset:", offset, "sort:", sort, "searchTerm:", searchTerm);
  try {
    if (offset === 0) {
      if (!type || type.trim() === "") {
        return res.status(404).json({ 'error': 'Type not provided.' })
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      pokemonList = response.data.pokemon.map(p => ({
        name: p.pokemon.name,
        url: p.pokemon.url,
        id: extractIdFromUrl(p.pokemon.url),
      }))

      if (searchTerm && searchTerm.trim() !== "") {
        pokemonList = pokemonList.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()))
        if (pokemonList.length === 0) {
          return res.json([])
        }
      }

      // if (sort !== "") {
      //   pokemonList = sortPokemon(pokemonList, sort);
      // }
      if (sort !== "" && sort !== "likes" && sort !== "dislikes") {
        pokemonList = sortPokemon(pokemonList, sort);
      } else if (sort === "likes") {
        pokemonList = await pokemonService.sortByLikes();
      } else if (sort === "dislikes") {
        pokemonList = await pokemonService.sortByDislikes();
      }
    }

    const paginatedPokemonList = pokemonList.slice(offset, offset + limit); 
    const detailedPokemonList = await addDataToPokemonList(paginatedPokemonList);

    res.json(detailedPokemonList)

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

const sortByLikes = async (req, res, next) => {
  try {
    const pokemons = await pokemonService.sortByLikes();
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
}

const sortByDislikes = async (req, res, next) => {
  try {
    const pokemons = await pokemonService.sortByDislikes();
    res.json(pokemons);
  } catch (error) {
    next(error);
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
  getPokemonByName,
  sortByLikes,
  sortByDislikes
};
