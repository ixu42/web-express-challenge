const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.post('/liked', pokemonController.likedPokemon);
router.get('/search/:query?', pokemonController.getMatchingPokemon)
router.get('/type/:type?', pokemonController.getPokemonByType)
router.get('/', pokemonController.getPokemon)
router.get('/:name?', pokemonController.getPokemonByName)

module.exports = router;