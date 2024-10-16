const express = require('express')
const app = express()
const pokemonRoutes = require('./routes/pokemonRoutes')
const userRoutes = require('./routes/userRoutes')
const port = 3000;

app.use(express.json())
//mounting the routes
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Hello from port ${port}`)
  })
  