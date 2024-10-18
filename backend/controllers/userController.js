const userService = require('../services/userService');
const AppError = require('../errors/errorClass');

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const user = await userService.registerUser({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const getLikedPokemonsByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemons = await userService.getLikedPokemonsByUserId(id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
}

module.exports = {
  registerUser,
  getLikedPokemonsByUserId,
};
