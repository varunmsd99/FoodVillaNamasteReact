import { RestaurantList } from "../Constant";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import getRestaurantData from "./getRestaurantList";
const Body = () => {
  [allRes, setAllRes]=useState([]);
  useEffect(() => {
    setAllRes = getRestaurantData();
  }, []);
  console.log(allRes);
  return (
    <div className="Restaurant-list">
      {RestaurantList.map((restaurant) => {
        return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
      })}
    </div>
  );
};
export default Body;
