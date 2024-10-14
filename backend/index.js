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

app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=42')
      res.json(response.data.results)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error fetching data from PokeAPI')
    }
})
/* app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=42')
      res.json(response.data.results)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error fetching data from PokeAPI')
    }
}) */

app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
