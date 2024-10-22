const axios = require("axios");
const db = require("../database/db");
const { ValidationError } = require("../errors/errorClass");

const insertPokemon = async (pokemon_id, name) => {
  const text =
    `INSERT INTO pokemons(id, name)
     VALUES($1, $2)
     ON CONFLICT (name) DO NOTHING
     RETURNING id`;
  const values = [pokemon_id, name];
  const res = await db.query(text, values);
  return res.rows[0]?.id;
};

const insertLikedPokemon = async (user_id, pokemon_id) => {
  const text = `
    INSERT INTO user_pokemons (pokemon_id, user_id, relationship)
    VALUES ($1, $2, 'like')
    ON CONFLICT (pokemon_id, user_id)
    DO UPDATE SET
      relationship = CASE
        WHEN user_pokemons.relationship = 'dislike' THEN 'like'
        ELSE user_pokemons.relationship
      END
    RETURNING user_id, pokemon_id`;

  const values = [pokemon_id, user_id];
  const result = await db.query(text, values);
  return result;
};


const insertDislikedPokemon = async (user_id, pokemon_id) => {
  const text = `
  INSERT INTO user_pokemons (pokemon_id, user_id, relationship)
  VALUES ($1, $2, 'dislike')
  ON CONFLICT (pokemon_id, user_id)
  DO UPDATE SET
    relationship = CASE
      WHEN user_pokemons.relationship = 'like' THEN 'dislike'
      ELSE user_pokemons.relationship
    END
  RETURNING user_id, pokemon_id`;
  const values = [pokemon_id, user_id];
  const result = await db.query(text, values);
  return result;
};

const likedPokemon = async (user_id, pokemon_id, name) => {
  await insertPokemon(pokemon_id, name);
  const result = await insertLikedPokemon(user_id, pokemon_id);
  return result.rows[0];
};

const unlikePokemon = async (user_id, pokemon_id) => {
  const text =
    "DELETE FROM user_pokemons WHERE user_id = $1 AND pokemon_id = $2 AND relationship = 'like' RETURNING user_id, pokemon_id";
  const values = [user_id, pokemon_id];
  const result = await db.query(text, values);
  return result.rows[0];
};

const dislikedPokemon = async (user_id, pokemon_id, name) => {
  await insertPokemon(pokemon_id, name);
  const result = await insertDislikedPokemon(user_id, pokemon_id);
  return result.rows[0];
};

const undislikePokemon = async (user_id, pokemon_id) => {
  const text =
    "DELETE FROM user_pokemons WHERE user_id = $1 AND pokemon_id = $2 AND relationship = 'dislike' RETURNING user_id, pokemon_id";
  const values = [user_id, pokemon_id];
  const result = await db.query(text, values);
  return result.rows[0];
};

module.exports = {
  likedPokemon,
  unlikePokemon,
  dislikedPokemon,
  undislikePokemon,
};
