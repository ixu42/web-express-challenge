const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const saltRounds = 10;
const { createProfile } = require("./services/profileService");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "youruser",
  host: "localhost",
  database: "pokemon-db",
  password: "yourpassword",
  port: 5432,
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); // Pass control to the next handler
  }
  res.status(401).send("Unauthorized"); // If not logged in, respond with 401
};

// Register a new user // added return id and creating profile
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ msg: "Username, password and email are required" });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(username, password);
    const query =
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [username, hash, email]);
    const user = result.rows[0];
    const profile = {
      user_id: user.id,
      name: user.username,
      bio: ""
    };

    // Save user in session
    const userProfile = await createProfile(profile);
    req.session.user = { id: userProfile.id, username: userProfile.name, profile_pic: userProfile.profile_pic };
    res.status(201).json({
      user: req.session.user,
      msg: "User registered",
    });
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Username or email already taken" }); // 409 Conflict
    }
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const query = `
      SELECT users.id, users.username , users.password , profiles.profile_pic 
      FROM users 
      LEFT JOIN profiles ON users.id = profiles.user_id 
      WHERE users.username = $1
    `;
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Save user in session
      const base64 = user.profile_pic ? user.profile_pic.toString("base64") : null;
      user.profile_pic = base64;
      req.session.user = { id: user.id, username: user.username, profile_pic: user.profile_pic };
      res.json({ loggedIn: true, user: req.session.user });

     // res.send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

// Logout user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.send("Logged out successfully");
  });
};

module.exports = { registerUser, loginUser, logoutUser, isAuthenticated };
