import { useEffect } from "react";
import { REST_API_MENU_URL } from "../Constant";

const RestaurantMenu = () => {
  useEffect(() => {
    getRestaurantMenu();
  }, []);
  async function getRestaurantMenu() {
    const data = await fetch(REST_API_MENU_URL);
    const json = await data.json();
    console.log(json);
  }
  return (
    <div>
      <h1>RestaurantMenu</h1>
    </div>
  )
}

export default RestaurantMenu;