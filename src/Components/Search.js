import { useState, useEffect } from "react";
import { RestaurantList } from "../Constant";

const [filteredRestaurants, setFilteredRestaurants] = useState();
const [restaurants, setRestaurants] = useState(RestaurantList);
const [searchText, setSearchText] = useState("");

const search = () => {
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
            const data = filterData(searchText, restaurants);
            setRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
    );
};