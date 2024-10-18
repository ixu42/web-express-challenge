const pokemonModel = require("../models/pokemonModel");

const likedPokemon = async (req, res, next) => {
  try {
    const { user_id, pokemon_id, pokemon_name } = req.body;
    const pokemon = await pokemonModel.likedPokemon(
      user_id,
      pokemon_id,
      pokemon_name
    );
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  likedPokemon,
};
