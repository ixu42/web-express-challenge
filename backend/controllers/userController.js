const userService = require('../services/userService');

const getLikedPokemonsByUser = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const pokemons = await userService.getLikedPokemonsByUserId(id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

const getDislikedPokemonsByUser = async (req, res, next) => {
  try {
    const { id } = req.session.user;
    const pokemons = await userService.getDislikedPokemonsByUserId(id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

const getLikedPokemonsByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params
    const pokemons = await userService.getLikedPokemonsByUserId(user_id);
    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}

const getDislikedPokemonsByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const pokemons = await userService.getDislikedPokemonsByUserId(user_id);
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

const registerUser = async (req, res, next) => {
  try {
    const { username, password} = req.body;
    const user = await userService.registerUser(username, password);
    req.session.user = { id: user.id, username: user.username };
    res.status(201).json({ user: user, msg: "User registered" });
  } catch (error) {
    next(error);
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    req.session.user = { id: user.id, username: user.username };
    res.status(200).json({ user: user, msg: "User logged in" });
  } catch (error) {
    next(error);
  }
}

const logoutUser = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).json({ msg: "User logged out" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getLikedPokemonsByUser,
  getDislikedPokemonsByUser,
  getLikedPokemonsByUserId,
  getDislikedPokemonsByUserId,
  searchUsers,
  registerUser,
  loginUser,
  logoutUser,
};
