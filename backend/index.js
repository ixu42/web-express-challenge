const express = require('express')
const axios = require('axios')
const { Pool } = require('pg')

const port = 3000;
const app = express()

app.use(express.json())

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'pokemon-db',
    password: 'yourpassword',
    port: 5432,
  })

app.use(express.json())

// A non-exhaustive list of 42 Pokémon
app.get('/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=42')
    res.json(response.data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ 'error': 'Error fetching data from PokeAPI'})
  }
})

// Details of a Pokémon by name
app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  console.log(name)
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    res.json(response.data)
  } catch (err) {
    console.error(err)
    if (err.response) {
      // The request was made and the server responded with a status code
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
})

// A list of Pokémon by type
app.get('/pokemon/type/:type', async (req, res) => {
  const { type } = req.params;
  console.log(type)
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)

  // Extract a list of Pokémon of the given type
  const typePokemon = response.data.pokemon.map(p => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }))

  res.json(typePokemon)

  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' });
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
})

app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
