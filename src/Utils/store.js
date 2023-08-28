import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";

const store = configureStore({
    reducer: {
        location: locationSlice,
    }
});

export default store