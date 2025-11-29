import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./authSlice";

const store = configureStore({
    reducer: {
        auth: tokenSlice.reducer
    }
})

export default store;