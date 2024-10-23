const express = require('express')
const session = require('express-session')
const { registerUser, loginUser, logoutUser, isAuthenticated } = require('./userController')
const pokemonRoutes = require("./routes/pokemonRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { handleError } = require("./middlewares/errorMiddleware");
const profileService = require("./services/profileService");

const port = 3000
const app = express()

app.use(express.json())


app.use(session({
  secret: 'yourSecretKey', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // Session duration (1 hour)
    secure: false, // Set to true if using HTTPS
    httpOnly: true // Prevents JavaScript access to the cookie
  }
}))

// PostgreSQL connection configuration

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);


// Base URL endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from internal API'
  })
})

app.post('/api/register', registerUser)
app.post('/api/login', loginUser)
app.post('/api/logout', logoutUser)

// Check if the user is logged in
app.get('/api/auth/check', async (req, res) => {
  if (req.session.user) {
    console.log("User is logged in");
    const user = await profileService.getProfileById(req.session.user.id);
    console.log("User:", user);
    res.json({ loggedIn: true, user: user });
  } else {
    res.json({ loggedIn: false });
  }
});

//middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
