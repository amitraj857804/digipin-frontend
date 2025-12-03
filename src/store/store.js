import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./authSlice";
import addressReducer from "./addressSlice";

const store = configureStore({
    reducer: {
        auth: tokenSlice.reducer,
        address: addressReducer,
    }
})

export default store;