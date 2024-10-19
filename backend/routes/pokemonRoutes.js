const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const { isAuthenticated } = require("../userController");

router.post("/liked", isAuthenticated, pokemonController.likedPokemon);
router.delete(
  "/unlike/:pokemon_id",
  isAuthenticated,
  pokemonController.unlikePokemon
);
router.post("/disliked", isAuthenticated, pokemonController.dislikedPokemon);
router.delete("/undislike/:pokemon_id", pokemonController.undislikePokemon);

module.exports = router;
