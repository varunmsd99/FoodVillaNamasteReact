import { useState } from 'react';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    return(
        <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
          }}
        >Search
        </button>
      </div>
    );
};
export default Search;