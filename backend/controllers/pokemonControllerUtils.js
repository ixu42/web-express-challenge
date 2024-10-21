const axios = require('axios')

// If a fetched pokemon img is invalid, fall back to default img
const defaultPokemonImgUrl = '../img/default_pokemon.png'

const extractIdFromUrl = (url) => {
  const idMatch = url.match(/\/(\d+)\//); // Capture digits from the URL
  return idMatch ? parseInt(idMatch[1], 10) : null;
};

// Function to fetch the full list of Pokémon from the external API
const fetchAllPokemon = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const newPokemonList = response.data.results;

    // Extract ID from url
    const pokemonListWithIds = newPokemonList.map(pokemon => ({
      ...pokemon,
      id: extractIdFromUrl(pokemon.url)
    }));

    return pokemonListWithIds;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

// Shuffle Function
const shufflePokemon = (array) => {
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

const sortPokemon = (pokemonList, sort) => {
  return pokemonList.sort((a, b) => {
    if (sort === 'A-Z') return a.name.localeCompare(b.name); // Sort by name A-Z
    if (sort === 'Z-A') return b.name.localeCompare(a.name); // Sort by name Z-A
    if (sort === 'ID-asc') return a.id - b.id;               // Sort by ID ascending (low to high)
    if (sort === 'ID-desc') return b.id - a.id;              // Sort by ID descending (high to low)
    return 0;                                                // Default: no sorting
  });
};

const isValidUrl = async (url) => {
  try {
    const response = await axios.head(url); // Use HEAD to check URL without downloading
    return response.status === 200; // Only return true if the response status is 200 OK
  } catch (error) {
    // console.error(`Invalid URL: ${url}`, error.message)
    return false;
  }
};

const getValidImgUrl = async (pokemonId) => {
  let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
  let isImageValid = await isValidUrl(imageUrl)
  if (!isImageValid) {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
  }
  isImageValid = await isValidUrl(imageUrl)

  imageUrl = isImageValid ? imageUrl : defaultPokemonImgUrl
  return imageUrl
}

// Fetch detailed information for each Pokémon to get image
const addImgUrlToPokemonDetails = async (paginatedPokemonList) => {
  paginatedPokemonList = await Promise.all(
    paginatedPokemonList.map(async (pokemon) => {
      const validImageUrl = await getValidImgUrl(pokemon.id) 
      return {
        ...pokemon,
        image: validImageUrl
      }
    })
  )
  return paginatedPokemonList;
};

module.exports = {
  fetchAllPokemon,
  shufflePokemon,
  sortPokemon,
  getValidImgUrl,
  addImgUrlToPokemonDetails
};
