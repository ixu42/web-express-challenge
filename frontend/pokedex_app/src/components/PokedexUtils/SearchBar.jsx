import React from "react";

// Search bar
const SearchBar = ({ searchTerm, onSearch }) => (
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

export default SearchBar;