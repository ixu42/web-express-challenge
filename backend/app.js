const express = require("express");
const app = express();
const pokemonRoutes = require("./routes/pokemonRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { handleError } = require("./middlewares/errorMiddleware");
const port = 3000;

app.use(express.json());
//mounting the routes
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

//middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Hello from port ${port}`);
});
