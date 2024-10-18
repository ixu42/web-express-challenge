const express = require('express')
const axios = require('axios')
const { Pool } = require('pg')
const session = require('express-session')
const { registerUser, loginUser, logoutUser, isAuthenticated } = require('./userController')
const pokemonRoutes = require("./routes/pokemonRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { handleError } = require("./middlewares/errorMiddleware");

const port = 3000
const app = express()

app.use(express.json())

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

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

app.use(express.json())

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'youruser',
    host: 'localhost',
    database: 'pokemon-db',
    password: 'yourpassword',
    port: 5432,
  })

app.post('/api/register', registerUser)
app.post('/api/login', loginUser)
app.post('/api/logout', logoutUser)

// Check if the user is logged in
app.get('/api/auth/check', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Function to fetch the full list of Pokémon from the external API
const fetchPokemonList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

// Shuffle Function
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

// Fetch shuffled Pokémon with pagination
app.get('/api/pokemon/shuffle', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20 // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // Offset for pagination
  console.log("/api/pokemon/shuffle, limit:", limit, "offset:", offset)

  try {
    // Fetch and shuffle the Pokémon list on every request
    const pokemonList = await fetchPokemonList();
    const shuffledPokemonList = shuffleArray(pokemonList); // Shuffle every time

    // Paginate the shuffled list
    const paginatedResults = shuffledPokemonList.slice(offset, offset + limit);

    // Fetch detailed information for each Pokémon to get the ID and image
    const detailedResults = await Promise.all(
      paginatedResults.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        const pokemonId = pokemonData.data.id;

        let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
        let isImageValid = await isValidUrl(imageUrl);
        if (!isImageValid) {
          imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        }

        return {
          ...pokemon,
          id: pokemonId,
          image: isImageValid ? imageUrl : defaultPokemonImgUrl
        };
      })
    );

    res.json(detailedResults);
  } catch (error) {
    console.error('Error fetching shuffled Pokémon:', error);
    res.status(500).json({ error: 'Error fetching shuffled Pokémon.' });
  }
});

// If a fetched pokemon img is invalid, fall back to default img
const defaultPokemonImgUrl = '../img/default_pokemon.png'

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

const isValidUrl = async (url) => {
  try {
    const response = await axios.head(url) // Use HEAD to check URL without downloading
    return response.status === 200 // Only return true if the response status is 200 OK
  } catch (error) {
    // console.error(`Invalid URL: ${url}`, error.message)
    return false
  }
}

// Fetch a list of Pokémon based on a substring match
app.get('/api/pokemon/search/:query?', async (req, res) => {
  const { query } = req.params
  const limit = parseInt(req.query.limit) || 20  // Number of Pokémon per page
  const offset = parseInt(req.query.offset) || 0 // How many Pokémon to skip
  console.log("query:", query, "limit:", limit, "offset:", offset)

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000')
    const pokemonList = response.data.results

    let matchingPokemon;
    if (!query || query.trim() === "") {
      matchingPokemon = pokemonList
    } else {
      matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(query.toLowerCase()))
      if (matchingPokemon.length === 0) {
        return res.json([])
      }
    }

    let paginatedResults = matchingPokemon.slice(offset, offset + limit);
    // Fetch detailed information for each Pokémon to get the ID and image
    paginatedResults = await Promise.all(
      paginatedResults.map(async (pokemon) => {
        // Fetch detailed data for each Pokemon
        const pokemonData = await axios.get(pokemon.url)
        const pokemonId = pokemonData.data.id
  
        let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
        let isImageValid = await isValidUrl(imageUrl)
        if (!isImageValid) {
          imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
        }
        isImageValid = await isValidUrl(imageUrl)

        return {
          ...pokemon,
          id: pokemonId,
          image: isImageValid ? imageUrl : defaultPokemonImgUrl
        }
      })
    )

    res.json(paginatedResults)
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
    let pokemonList = response.data.results

    // Fetch detailed information for each Pokémon to get the ID and image
    pokemonList = await Promise.all(
    pokemonList.map(async (pokemon) => {
      // Fetch detailed data for each Pokemon
      const pokemonData = await axios.get(pokemon.url)
      const pokemonId = pokemonData.data.id

      let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
      let isImageValid = await isValidUrl(imageUrl)
      if (!isImageValid) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
      }
      isImageValid = await isValidUrl(imageUrl)

     return {
       ...pokemon,
       id: pokemonId,
       image: isImageValid ? imageUrl : defaultPokemonImgUrl
     }
    })
  )

    res.json(pokemonList)
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
    const pokemonData = response.data
    const pokemonId = pokemonData.id

    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
      let isImageValid = await isValidUrl(imageUrl)
      if (!isImageValid) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
      }
      isImageValid = await isValidUrl(imageUrl)

    const pokemonWithValidImage = {
      ...pokemonData,
      image: isImageValid ? imageUrl : defaultPokemonImgUrl
    }

    res.json(pokemonWithValidImage)
  } catch (err) {
    console.error(err)
    if (err.response) {
      res.status(err.response.status).json({ 'error': 'Pokémon not found.' })
    } else {
      res.status(500).json({ 'error': 'There was an error fetching the Pokémon data.'})
    }
  }
})

//middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Hello from port ${port}`)
})
