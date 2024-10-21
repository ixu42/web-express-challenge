import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/logo.png';
import './pokedex.css';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [matchingList, setMatchingList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetForSearching, setOffsetForSearching] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [morePokemon, setMorePokemon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [sortOrder, setSortOrder] = useState("ID-asc");

  const location = useLocation();

  const limit = 20; // Number of Pokémon per page
  const abortControllerRef = useRef(null); // Ref to store the current AbortController

  console.log("rendering Pokedex...");

  // Function to fetch Pokemon list (non-search)
  const fetchPokemonList = async (offsetValue=0, shouldShuffle=false, sortOrder="") => {
    console.log("fetchPokemonList() called, offset:", offsetValue, "shouldShuffle:", shouldShuffle);
    try {
      const response = await fetch(`/api/pokemon?limit=${limit + 1}&offset=${offsetValue}&sort=${sortOrder}&shuffle=${shouldShuffle}`);
      const newPokemonList = await response.json();
      console.log("newPokemonList:", newPokemonList)
      if (newPokemonList.length > limit) {
        setPokemonList((prevList) => [...prevList, ...newPokemonList.slice(0, limit)]);
      } else {
        setMorePokemon(false);
        setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  // Function to fetch Pokemon list (search)
  const fetchMatchingList = async (query, offsetValue=0, sortOrder="") => {
    console.log("fetchMatchingList() called");

    // Cancel the previous fetch request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController instance
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    console.log("offsetForSearching:", offsetValue);
    try {
      const response = await fetcpokemonListh(`/api/pokemon/search/${query}?limit=${limit + 1}&offset=${offsetValue}&sort=${sortOrder}`, {
        signal: abortController.signal, // Pass the signal to the fetch request
      });

      if (response.ok) {
        const newMatchingList = await response.json();
        console.log("searchTerm:", query, "| newMatchingList:", newMatchingList)
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

const searchPokemon = async (userInput) => {
    console.log("searchPokemon() called, userInput:", userInput);

    setSearchTerm(userInput);
    setSortOrder("ID-asc");
    setOffset(0);
    setOffsetForSearching(0);
    setPokemonList([]);
    setMatchingList([]);
    setMorePokemon(true);
    if (userInput === "") {
      await fetchPokemonList(0, false, "ID-asc");
    } else {
      await fetchMatchingList(userInput, 0, "ID-asc");
    }
  };

  const sortPokemon = async (sortOrderValue) => {
    console.log("sortPokemon() called", "sort by:", sortOrderValue);

    setSortOrder(sortOrderValue);
    setOffset(0);
    setOffsetForSearching(0);
    setPokemonList([]);
    setMatchingList([]);
    setMorePokemon(true);
    if (searchTerm === "") {
      await fetchPokemonList(0, false, sortOrderValue);
    } else {
      await fetchMatchingList(searchTerm, 0, sortOrderValue);
    }
  };

  const shufflePokemon = async () => {
    console.log("shufflePokemon() called");
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
    setIsLoading(true);
    if (searchTerm === "") {
      setOffset((prevOffset) => prevOffset + limit);
      await fetchPokemonList(offset + limit, false, sortOrder);
    } else {
      setOffsetForSearching((prevOffset) => prevOffset + limit);
      await fetchMatchingList(searchTerm, offsetForSearching + limit, sortOrder)
    }
    setIsLoading(false);
  };

  // useEffect to call fetchPokemonList initially
  // useEffect(() => {
  //   console.log("useEffect() called");
  //   fetchPokemonList(0, false, "ID-asc"); // Fetch the initial Pokémon list, sort by ID (ascending)
  // }, []);

  // Use the passed state (if available) to restore the Pokémon list
  useEffect(() => {
    console.log("useEffect() for passed state");
    if (location.state?.pokemonList) {
      console.log("location.state?.pokemonList exists")
      setPokemonList(location.state.pokemonList);
    } else {
      console.log("location.state?.pokemonList does not exist")
      // Fetch the Pokémon list if there's no state passed
      fetchPokemonList(0, false, "ID-asc");
    }
  }, [location.state]);

  return (
    <div>
      <header>
        <img alt="react logo" className="logo" src={logo} />
      </header>
      <main>
        <Search searchTerm={searchTerm} onSearch={searchPokemon} />
        <Sort sortOrder={sortOrder} onSort={sortPokemon} />
        <Shuffle isFetching={isFetching} onShuffle={shufflePokemon} />
        {/* Pokémon List or Search Results */}
        {!searchTerm ? (
          <PokemonList pokemonList={pokemonList} />
        ) : (
          <SearchResults matchingList={matchingList} />
        )}
        {morePokemon && (<LoadMore isLoading={isLoading} onLoadMore={loadMorePokemon}/>)}
      </main>
    </div>
  );
};

// Search bar
const Search = ({ searchTerm, onSearch }) => (
  <div className="search-container">
    <input
      className="search-box"
      type="text"
      placeholder="Search..."
      value={searchTerm} // Set input value to the search term
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

// Sort options
const Sort = ({ sortOrder, onSort }) => (
  <div className="sort-container flex justify-end mr-8 sm:mr-12 md:mr-16">
    <label htmlFor="sortOrder"className="text-lg font-bold mr-2 text-green-600">
      Sort by:
    </label>
    <select
      id="sortOrder"
      value={sortOrder}
      onChange={(e) => {onSort(e.target.value)}} // Update sort order on change
    >
    <option value="ID-asc">ID (Ascending)</option>
    <option value="ID-desc">ID (Descending)</option>
    <option value="A-Z">A-Z</option>
    <option value="Z-A">Z-A</option>
    <option value="random" disabled>Random</option> 
    </select>
  </div>
);

// Shuffle button
const Shuffle = ({ isFetching, onShuffle }) => (
  <button
    onClick={onShuffle}
    disabled={isFetching}
    className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
      ${isFetching ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
  >
    {isFetching ? "Loading..." : "Shuffle"}
  </button>
);

// Pokémon List component (non-search)
const PokemonList = ({ pokemonList }) => (
  <ul className="pokemon-list">
    {pokemonList.map(pokemon => (
      <li key={pokemon.name} className="pokemon-item">
        <Link 
          to={`/pokemon/${pokemon.name}`}
          state={{ pokemonList }}
        >
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          <p>{pokemon.name}</p>
          <p>ID: {pokemon.id}</p>
        </Link>
        {/* <a href={`/pokemon/${pokemon.name}`}>
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          <p>{pokemon.name}</p>
          <p>ID: {pokemon.id}</p>
        </a> */}
      </li>
    ))}
  </ul>
);

// Search Results component
const SearchResults = ({ matchingList }) => (
  matchingList && matchingList.length > 0 ? (
    <ul className="pokemon-list">
      {matchingList.map(pokemon => (
        <li key={pokemon.name} className="pokemon-item">
          <a href={`/pokemon/${pokemon.name}`}>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            {pokemon.name}
            <p>ID: {pokemon.id}</p>
          </a>
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
  )
);

// Load more button
const LoadMore = ({ isLoading, onLoadMore }) => (
    <button
      onClick={onLoadMore}
      disabled={isLoading}
      className={`block mx-auto my-12 px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-all
        ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
    >
      {isLoading ? "Loading..." : "Load More Pokémon"}
    </button>
);

export default Pokedex;