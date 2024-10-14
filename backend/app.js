const express = require('express')
const app = express()
const pokemonRoutes = require('./routes/pokemonRoutes')
const port = 3000;

app.use(express.json())
//mounting the routes
app.use('/api/pokemon', pokemonRoutes);

app.listen(port, () => {
    console.log(`Hello from port ${port}`)
  })
  