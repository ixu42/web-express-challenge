const userModel = require('../models/userModel');

const getLikedPokemonsByUserId = async (user_id) => {
  try {
    console.log('getLikedPokemons');
    const pokemons = await userModel.getLikedPokemonsByUserId(user_id);
    console.log('getLikedPokemons successfull:', pokemons);
    return pokemons;
  } catch (error) {
    console.log('error getLikedPokemons:', error.message);
    throw error;
  }
};

const getDislikedPokemonsByUserId = async (user_id) => {
  try {
    console.log('getDislikedPokemons');
    const pokemons = await userModel.getDislikedPokemonsByUserId(user_id);
    console.log('getDislikedPokemons successfull:', pokemons);
    return pokemons;
  } catch (error) {
    console.log('error getDislikedPokemons:', error.message);
    throw error;
  }
}

const searchUsers = async (username) => {
  try {
    console.log('searchUsers');
    const users = await userModel.searchUsers(username);
    console.log('searchUsers successfull:', users);
    return users;
  } catch (error) {
    console.log('error searchUsers:', error.message);
    throw error;
  }
}


module.exports = {
  getLikedPokemonsByUserId,
  getDislikedPokemonsByUserId,
  searchUsers,
};
