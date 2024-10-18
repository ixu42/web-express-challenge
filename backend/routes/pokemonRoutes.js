const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.post('/liked', pokemonController.likedPokemon);

module.exports = router;
