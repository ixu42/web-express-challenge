const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post("/liked", isAuthenticated, pokemonController.likedPokemon);
router.delete(
  "/unlike/:pokemon_id",
  isAuthenticated,
  pokemonController.unlikePokemon
);
router.post("/disliked", isAuthenticated, pokemonController.dislikedPokemon);
router.delete(
  "/undislike/:pokemon_id",
  isAuthenticated,
  pokemonController.undislikePokemon
);

router.get('/', pokemonController.getPokemon)
router.get('/search/:query?', pokemonController.getMatchingPokemon)
router.get('/type/', pokemonController.getPokemonTypes)
router.get('/type/:type?', pokemonController.getPokemonByType)
router.get('/:name?', pokemonController.getPokemonByName)

module.exports = router;
