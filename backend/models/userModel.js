const db = require("../database/db");

const isEmailTaken = async (email) => {
    console.log('isEmailTaken', email);
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length > 0) {
    throw new Error("Email already taken");
  }
};

const isUsernameTaken = async (username) => {
    console.log('isUsernameTaken', username);
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    throw new Error("Username already taken");
  }
};

const createUser = async (username, email, password) => {
  const result = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  isEmailTaken,
  isUsernameTaken,
};
