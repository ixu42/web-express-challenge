const express = require('express');
const router = express.Router();
const pokeApiController = require('../controllers/pokeApiController');

// Route for fetching and storing Pokémon data
router.get('/', pokeApiController.fetchPokemons);
router.get('/fetch', pokeApiController.fetchPokemon);

module.exports = router;
