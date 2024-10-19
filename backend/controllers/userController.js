const userService = require('../services/userService');

const getLikedPokemonsByUserId = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const pokemons = await userService.getLikedPokemonsByUserId(id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

const getDislikedPokemonsByUserId = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const pokemons = await userService.getDislikedPokemonsByUserId(id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

const searchUsers = async (req, res, next) => {
  try {
    const { username } = req.query;
    const users = await userService.searchUsers(username);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLikedPokemonsByUserId,
  getDislikedPokemonsByUserId,
  searchUsers,
};
