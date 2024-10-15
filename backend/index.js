const express = require('express')
const axios = require('axios')
const { Pool } = require('pg')

const port = 3000
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

// Base URL endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'This is internal API',
    version: '1.0.0',
    endpoints: {
      getPokemon: '/api/pokemon',
      getPokemonByName: '/api/pokemon/:name',
      getPokemonByType: '/api/pokemon/type/:type'
    }
  })
})

// Fetch a list of Pokémon based on a substring match
app.get('/api/pokemon/search/:query?', async (req, res) => {
  const { query } = req.params
  console.log("query:", query)

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000')
    const pokemonList = response.data.results

    if (!query || query.trim() === "") {
      return res.json(pokemonList)
    }

    const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(query.toLowerCase()))

    if (matchingPokemon.length === 0) {
      return res.status(404).json({ 'error': 'No matching Pokémon found.' })
    }

    res.json(matchingPokemon)
  } catch (err) {
    console.error(err)
    if (err.response) {
      // The request was made and the server responded with a status code
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.' })
    }
  }
})

// A list of Pokémon by type
app.get('/api/pokemon/type/:type?', async (req, res) => {
  const { type } = req.params
  console.log("type:", type)
  try {
    if (!type || type.trim() === "") {
      return res.status(404).json({ 'error': 'Type not provided.' })
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)

  // Extract a list of Pokémon of a given type
  const typePokemon = response.data.pokemon.map(p => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }))

  res.json(typePokemon)

  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
})

// Divide the data into chunks (pages) and send the appropriate chunk based on the client's request
app.get('/api/pokemon', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20  // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // How many Pokémon to skip
  console.log("/api/pokemon requested:", "limit =", limit, "offset =", offset)
  
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    res.json(response.data.results)
  } catch (err) {
    res.status(500).json({ 'error': 'Error fetching Pokémon data' })
  }
})

// Details of a Pokémon by name
app.get('/api/pokemon/:name?', async (req, res) => {
  const { name } = req.params
  console.log("name:", name)
  try {
    if (!name || name.trim() === "") {
      return res.status(404).json({ 'error': 'Name not provided.' })
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    res.json(response.data)
  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
})



app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
