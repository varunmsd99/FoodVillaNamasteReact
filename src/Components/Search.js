import { useState } from 'react';
import * as Img from '../Images/popularCuisines/*.webp';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    console.log(Img);
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
        <div className="cuisine-container">
          <h2>Popular Cuisines</h2>
          <span className="cuisine-img-container">
            {Object.entries(Img).map(([key, value]) => ( 
              <img key={key} src={value}></img>
            ))}
          </span>
        </div>
      </div>
    );
};
export default Search;