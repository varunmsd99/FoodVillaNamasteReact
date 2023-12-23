import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        resDetails: {
            resName: '',
            resArea: '',
            resImg: '',
            resSla: {}
        },
        cartItems: []
    },
    reducers: {
        addItems: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeItems: (state, action) => {
            state.cartItems.pop(action.payload);
        },
        clearCart: (state, action) => {
            state.cartItems = [];
        }
    }
})

export const {addItems, removeItems, clearCart} = cartSlice.actions;
export default cartSlice.reducer;