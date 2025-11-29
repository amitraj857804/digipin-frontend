import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null,
    userName: null,
    userNameLoading: false,

}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("JWT_TOKEN", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("JWT_TOKEN");
            }

        },
        clearToken: (state) => {
            state.token = null;
            state.userName = null;
            localStorage.removeItem("JWT_TOKEN");
        },
    }
})

export const {
    setToken,
    clearToken,
    setUserName,
    clearUserName,
} = tokenSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.userName;