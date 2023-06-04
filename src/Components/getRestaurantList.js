import { swiggy_api_URL } from "../Constant";

export default async function getRestaurantList() {
    try {
        const response = await fetch(swiggy_api_URL);
        const json = await response.json();
        const resData =  json?.data?.cards[2]?.data?.data?.cards;
        return resData;
    } catch (error) {
        console.log(error);
    }
}

