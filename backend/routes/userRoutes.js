const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../userController");

router.get(
  "/liked_pokemons",
  isAuthenticated,
  userController.getLikedPokemonsByUserId
);
router.get(
  "/disliked_pokemons",
  isAuthenticated,
  userController.getDislikedPokemonsByUserId
);
router.get("/search", isAuthenticated, userController.searchUsers);

module.exports = router;
