import { RestaurantList } from "../Constant";
import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";
import getRestaurantList from "./getRestaurantList";
import { Link, NavLink } from "react-router-dom";

const Body = () => {
  useEffect(() => {
    getRestaurantList();
  }, []);
  return (
    <div>
      <div className="body-header">
        <div>
          <h2>{RestaurantList.length} Restaurants</h2>
        </div>
        <div className="filter-data">
          <ul>
            <li><NavLink className={({ isActive }) => (isActive ? "resFilter-active" : "resFilter")} to="/">Relevance</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "resFilter-active" : "resFilter")} to="/">Delivery Time</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "resFilter-active" : "resFilter")} to="/">Rating</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "resFilter-active" : "resFilter")} to="/">Cost: Low to High</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "resFilter-active" : "resFilter")} to="/">Cost: High to Low</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="Restaurant-list">
      {RestaurantList.map((restaurant) => {
        return (<Link to= {"/restaurant/"+restaurant.data.id} className="card-link">
                  <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
                </Link>);
      })}
    </div>
    </div>
  );
};
export default Body;
