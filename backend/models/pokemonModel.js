const axios = require("axios");
const db = require("../database/db");
const { ValidationError } = require("../errors/errorClass");

const insertPokemon = async (pokemon_id, name) => {
  const text =
    "INSERT INTO pokemons(id, name) VALUES($1, $2) ON CONFLICT (name) DO NOTHING RETURNING id";
  const values = [pokemon_id, name];
  const res = await db.query(text, values);
  return res.rows[0]?.id;
};

const insertLikedPokemon = async (user_id, pokemon_id) => {
  const text =
    "INSERT INTO liked_pokemons(pokemon_id, user_id) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING user_id, pokemon_id";
  const values = [pokemon_id, user_id];
  const result = await db.query(text, values);
  return result;
};

const likedPokemon = async (user_id, pokemon_id, name) => {
  await insertPokemon(pokemon_id, name);
  const result = await insertLikedPokemon(user_id, pokemon_id);
  if (result.rows.length === 0) {
    throw new ValidationError("Pokemon already liked");
  }
  return result.rows[0];
};

module.exports = {
  likedPokemon,
};
