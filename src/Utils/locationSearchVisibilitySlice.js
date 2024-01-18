import { createSlice } from "@reduxjs/toolkit";

const locationSearchVisiblilitySlice = createSlice({
    name: "locSearch",
    initialState: {
        visible: false
    },
    reducers: {
        openLocSearch: (state, action) => {
            state.visible = false
        },
        closeLocSearch: (state, action) => {
            state.visible = true
        }
    }
})

export const {openLocSearch, closeLocSearch}  = locationSearchVisiblilitySlice.actions;
export default locationSearchVisiblilitySlice.reducer;