import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import cartSlice from "./cartSlice";
import restaurantListSlice from "./restaurantListSlice";

const store = configureStore({
    reducer: {
        location: locationSlice,
        cart: cartSlice,
        restaurantList: restaurantListSlice,
    }
});

export default store