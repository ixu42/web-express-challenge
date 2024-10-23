const pokemonModel = require('../models/pokemonModel');

const likedPokemon = async (user_id, pokemon_id, pokemon_name) => {
  try {
    console.log('liking pokemon');
    const pokemon = await pokemonModel.likedPokemon(user_id, pokemon_id, pokemon_name);
    console.log('liking pokemon successful:', pokemon);
    return pokemon;
  } catch (error) {
    console.log('error liking pokemon:', error.message);
    throw error;
  }
}

const unlikePokemon = async (user_id, pokemon_id) => {
  try {
    console.log('unliking pokemon');
    const pokemon = await pokemonModel.unlikePokemon(user_id, pokemon_id);
    console.log('unliking pokemon successful:', pokemon);
    return pokemon;
  } catch (error) {
    console.log('error unliking pokemon:', error.message);
    throw error;
  }
}

const dislikedPokemon = async (user_id, pokemon_id, pokemon_name) => {
  try {
    console.log('disliking pokemon');
    const pokemon = await pokemonModel.dislikedPokemon(user_id, pokemon_id, pokemon_name);
    console.log('disliking pokemon successful:', pokemon);
    return pokemon;
  } catch (error) {
    console.log('error disliking pokemon:', error.message);
    throw error;
  }
}

const undislikePokemon = async (user_id, pokemon_id) => {
  try {
    console.log('undisliking pokemon');
    const pokemon = await pokemonModel.undislikePokemon(user_id, pokemon_id);
    console.log('undisliking pokemon successful:', pokemon);
    return pokemon;
  } catch (error) {
    console.log('error undisliking pokemon:', error.message);
    throw error;
  }
}

const sortByLikes = async () => {
  try {
    console.log('sorting by likes');
    const pokemons = await pokemonModel.sortByLikes();
    pokemons.map(pokemon => {
      pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`;
    });
    console.log('sorting by likes successful:', pokemons);
    return pokemons;
  }
  catch (error) {
    console.log('error sorting by likes:', error.message);
    throw error;
  }
}

const sortByDislikes = async () => {
  try {
    console.log('sorting by dislikes');
    const pokemons = await pokemonModel.sortByDislikes();
    console.log('sorting by dislikes successful:', pokemons);
    pokemons.map(pokemon => {
      pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`;
    });
    return pokemons;
  }
  catch (error) {
    console.log('error sorting by dislikes:', error.message);
    throw error;
  }
}

module.exports = {
  likedPokemon,
  unlikePokemon,
  dislikedPokemon,
  undislikePokemon,
  sortByLikes,
  sortByDislikes,
};