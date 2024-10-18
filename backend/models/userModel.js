const db = require("../database/db");
const { NotFoundError, ValidationError, } = require("../errors/errorClass");

const isEmailTaken = async (email) => {
    console.log('isEmailTaken', email);
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    throw new ValidationError("Email already taken");
  }
};

const isUsernameTaken = async (username) => {
    console.log('isUsernameTaken', username);
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    throw new ValidationError("Username already taken");
  }
};

const createUser = async (username, email, password) => {
  const result = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

const getLikedPokemonsByUserId = async (userId) => {
  const query = `
      SELECT lp.user_id, p.id AS pokemon_id, p.name AS pokemon_name
      FROM liked_pokemons lp
      JOIN pokemons p ON lp.pokemon_id = p.id
      WHERE lp.user_id = $1;
  `;
  const result = await db.query(query, [userId]);
  return result.rows; // Return the array of liked Pokémon
};


module.exports = {
  createUser,
  isEmailTaken,
  isUsernameTaken,
  getLikedPokemonsByUserId,
};
