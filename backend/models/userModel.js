const db = require("../database/db");
const { NotFoundError, UnauthorizedError } = require("../errors/errorClass");

const getLikedPokemonsByUserId = async (userId) => {
  const query = `
    SELECT 
      u.id AS user_id,
      array_agg(p.name) AS liked_pokemons
    FROM 
      users u
    LEFT JOIN 
      user_pokemons up ON u.id = up.user_id
    LEFT JOIN 
      pokemons p ON up.pokemon_id = p.id
    WHERE 
       u.id = $1 AND relationship = 'like'
    GROUP BY 
      u.id;
  `;
  const result = await db.query(query, [userId]);
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows[0]; // Return the array of liked Pokémon
};

const getDislikedPokemonsByUserId = async (userId) => {
  const query = `
    SELECT 
      u.id AS user_id,
      array_agg(p.name) AS disliked_pokemons
    FROM 
      users u
    LEFT JOIN 
      user_pokemons up ON u.id = up.user_id
    LEFT JOIN 
      pokemons p ON up.pokemon_id = p.id
    WHERE 
       u.id = $1 AND relationship = 'dislike'
    GROUP BY 
      u.id;
  `;
  const result = await db.query(query, [userId]);
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows[0]; // Return the array of disliked Pokémon
}

const searchUsers = async (query) => {
  const searchQuery = `
    SELECT id, username
    FROM users
    WHERE username ILIKE $1;
  `;
  const result = await db.query(searchQuery, [`%${query}%`]);
  return result.rows[0]; // Return the array of users
}

const registerUser = async (username, password, email) => {
  const query = `
    INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [username, password, email]);
  if (result.rows.length === 0) {
    throw new UnauthorizedError("User not found");
  }
  return result.rows[0]; // Return the user
};

const loginUser = async (username) => {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;
  const result = await db.query(query, [username]);
  if (result.rows.length === 0) {
    throw new UnauthorizedError("Username not found");
  }
  return result.rows[0]; // Return the user
}

module.exports = {
  getLikedPokemonsByUserId,
  getDislikedPokemonsByUserId,
  searchUsers,
  registerUser,
  loginUser
};
