const pokemonService = require("../services/pokemonService");

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

module.exports = {
  likedPokemon,
  unlikePokemon,
  dislikedPokemon,
  undislikePokemon,
};
