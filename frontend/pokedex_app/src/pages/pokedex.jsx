import { useState, useEffect, useRef } from "react";
import logo from '../../img/logo.png';
import './pokedex.css';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [matchingList, setMatchingList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetForSearching, setOffsetForSearching] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // a boolean to indicate if "Shuffle" and "Load More Pokémon" buttons should be rendered
  const [morePokemon, setMorePokemon] = useState(true);
  // a boolean to indicate if the fetch in fetchPokemonList() / searchPokemon() is completed
  const [loading, setLoading] = useState(false);
  // a boolean to indicate if the fetch in fetchPokemonList() is completed
  const [isFetching, setIsFetching] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const limit = 10; // Number of Pokémon per page
  const abortControllerRef = useRef(null); // Ref to store the current AbortController

  console.log("rendering Pokedex...");

  // Function to fetch Pokemon list (non-search)
  const fetchPokemonList = async (offsetValue=0, shouldShuffle=false, sortOrder="") => {
    console.log("fetchPokemonList() called");
    console.log("offset:", offsetValue, "shouldShuffle:", shouldShuffle);
    console.log("searchTerm:", searchTerm);
    try {
      const response = await fetch(`/api/pokemon?limit=${limit + 1}&offset=${offsetValue}&sort=${sortOrder}&shuffle=${shouldShuffle}`);
      const newPokemonList = await response.json();
      console.log("newPokemonList:", newPokemonList)
      console.log("pokemonList length:", pokemonList.length)
      if (newPokemonList.length > limit) {
        // if (offsetValue === 0) {
        //   // Reset the pokemon list if it's the first load or when changing sort order
        //   setPokemonList(newPokemonList.slice(0, limit));
        // }
        setPokemonList((prevList) => [...prevList, ...newPokemonList.slice(0, limit)]);
      } else {
        setMorePokemon(false);
        setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  // Function to search for Pokemon
  const searchPokemon = async (query, offsetValue=0, sortOrder="") => {
    console.log("searchPokemon() called");

    // Cancel the previous fetch request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController instance
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    console.log("offsetForSearching:", offsetValue);
    try {
      const response = await fetch(`/api/pokemon/search/${query}?limit=${limit + 1}&offset=${offsetValue}&sort=${sortOrder}`, {
        signal: abortController.signal, // Pass the signal to the fetch request
      });

      if (response.ok) {
        const newMatchingList = await response.json();
        console.log("searchTerm:", query, "| newMatchingLis:", newMatchingList)
        if (newMatchingList.length > limit) {
          setMatchingList(prevList => [...prevList, ...newMatchingList.slice(0, limit)]);
        } else {
          setMorePokemon(false);
          setMatchingList(prevList => [...prevList, ...newMatchingList]);
        }
      } else {
        setMatchingList([]);
        setMorePokemon(false);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error searching Pokémon:", error);
      }
    }
  };

const handleSearch = async (userInput) => {
    console.log("handleSearch() called, userInput:", userInput);

    setSearchTerm(userInput);
    setSortOrder("ID-asc");
    setOffset(0);
    setOffsetForSearching(0);
    setMorePokemon(true);
    setPokemonList([]);
    setMatchingList([]);
    if (userInput === "") {
      await fetchPokemonList(0, false, "");
    } else {
      await searchPokemon(userInput, 0, "");
    }
  };

  const handleSort = async (sortOrderValue) => {
    console.log("handleSort() called", "sort by:", sortOrderValue);

    setSortOrder(sortOrderValue);
    setOffset(0);
    setOffsetForSearching(0);
    setPokemonList([]);
    setMatchingList([]);
    if (searchTerm === "") {
      await fetchPokemonList(0, false, sortOrderValue);
    } else {
      await searchPokemon(searchTerm, 0, sortOrderValue);
    }
  };

  const shuffle = async () => {
    console.log("shuffle() called");
    setSearchTerm("");
    setSortOrder("random");
    setOffset(0);
    setPokemonList([]);
    setMorePokemon(true);
    setIsFetching(true);
    await fetchPokemonList(0, true, ""); // Request a reshuffle
    setIsFetching(false);
  };

  const loadMorePokemon = async () => {
    console.log("loadMorePokemon() called");
    setLoading(true);
    if (searchTerm === "") {
      setOffset((prevOffset) => prevOffset + limit);
      await fetchPokemonList(offset + limit, false, "");
    } else {
      setOffsetForSearching((prevOffset) => prevOffset + limit);
      await searchPokemon(searchTerm, offsetForSearching + limit, "")
    }
    setLoading(false);
  };

  // useEffect to call fetchPokemonList initially
  useEffect(() => {
    console.log("useEffect() called")
    fetchPokemonList(0, false, ""); // Fetch the initial Pokémon list, sort by ID (ascending)
  }, []);

  return (
    <div>
      <header>
        <img alt="react logo" className="logo" src={logo} />
      </header>
      <main>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={searchTerm} // Set input value to the search term
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {/* Sorting Options */}
        <div className="sort-container flex justify-end mr-8 sm:mr-12 md:mr-16">
          <label htmlFor="sortOrder"className="text-lg font-bold mr-2 text-green-600">
            Sort by:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => {handleSort(e.target.value)}} // Update sort order on change
          >
          <option value="ID-asc">ID (Ascending)</option>
          <option value="ID-desc">ID (Descending)</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="random" disabled>Random</option> 
          </select>
        </div>
        {/* Shuffle Button */}
        <button
          onClick={shuffle}
          disabled={isFetching}
          className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
            ${isFetching ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
        >
          {isFetching ? "Loading..." : "Shuffle"}
        </button>
        {/* List of Pokémon when not searching */}
        {!searchTerm && (
          <ul className="pokemon-list">
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name} className="pokemon-item">
                <a href={`/pokemon/${pokemon.name}`}>
                  <img 
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <p>{pokemon.name}</p>
                  <p>id: {pokemon.id}</p>
                </a>
              </li>
            ))}
        </ul>
        )}
        {/* Matching Pokémon list when searching */}
        {searchTerm && (
          <>
            {matchingList && matchingList.length > 0 ? (
              <ul className="pokemon-list">
                {matchingList.map((pokemon) => (
                  <li key={pokemon.name} className="pokemon-item">
                    <a href={`/pokemon/${pokemon.name}`}>
                      <img 
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="pokemon-image"
                      />
                    {pokemon.name}
                    id: {pokemon.id}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center mt-8">
                <p className="text-center text-xl text-gray-600 font-semibold">
                  No Pokémon matched your search! 🤔
                </p>
                <p className="text-center text-md text-gray-500 mt-2">
                  Try a different name or spelling! 🌟
                </p>
              </div>
            )}
          </>
        )}
        {/* Load more button */}
        {morePokemon && (
          <button
            onClick={loadMorePokemon}
            disabled={loading}
            className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
          >
            {loading ? "Loading..." : "Load More Pokémon"}
          </button>
        )}
      </main>
    </div>
  );
};

export default Pokedex;