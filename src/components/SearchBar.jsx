import React from "react";

const SearchBar = ({ searchValue, handleSearch, frame }) => {
  return (
    <div className="search_bar">
      <input
        placeholder="Search Song, Artist"
        value={searchValue}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <img src={frame} alt="search" />
    </div>
  );
};

export default SearchBar;
