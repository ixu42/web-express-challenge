const userModel = require('../models/userModel');
const profileModel = require('../models/profileModel');
const profileService = require('./profileService');
const {ValidationError} = require('../errors/errorClass');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const registerUser = async (username, password, email) => {
  try {
    console.log('registerUser');
    if (!username){
      throw new ValidationError("Username is required");
    }
    if (!password){
      throw new ValidationError("Password is required");
    }
    if (!email){
      throw new ValidationError("Email is required");
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await userModel.registerUser(username, hash, email);
    const newProfile = {
      user_id: user.id,
      name: user.username,
      bio: ''
    };
    const profile = await profileService.createProfile(newProfile);
    console.log('registerUser successfull:', profile);
    return profile;
  } catch (error) {
    console.log('error registerUser:', error.message);
    throw error;
  }
}

const loginUser = async (username, password ) => {
  try {
    console.log('loginUser');
    if (!username || !password) {
      throw new ValidationError('Username is required');
    }
    if (!password) {
      throw new ValidationError('Password is required');
    }
    const user = await userModel.loginUser(username);
    console.log('loginUser user:', user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ValidationError('Invalid username or password');
    }
    const profile = await profileService.getProfileById(user.id);
    console.log('loginUser successfull:', profile);
    return profile;
  } catch (error) {
    console.log('error loginUser:', error.message);
    throw error;
  }
}


module.exports = {
  getLikedPokemonsByUserId,
  getDislikedPokemonsByUserId,
  searchUsers,
  registerUser,
  loginUser,
};
