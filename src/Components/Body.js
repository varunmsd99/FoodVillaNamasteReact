import { RestaurantList } from "../Constant";
import RestaurantCard from "./RestaurantCard";

const Body = () => {

  return (
      <div className="Restaurant-list" id="all-restaurants">
        {RestaurantList.map((restaurant) => {
          return (
            <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
          );
        })}
      </div>
  );
};
export default Body;
