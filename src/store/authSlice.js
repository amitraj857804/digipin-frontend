import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
    "auth/fetchUserDetails",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth.token;


            if (!token) {
                throw new Error('No token available');
            }

            const response = await api.get("/api/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                const errorMessage = 'Authentication expired. Please login again.';
                return rejectWithValue(errorMessage);
            }

            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch username';
            return rejectWithValue(errorMessage);
        }
    }
);

const initialState = {
    token: localStorage.getItem("JWT-TOKEN")
        ? JSON.parse(localStorage.getItem("JWT-TOKEN"))
        : null,
    userName: null,
    userEmail: null,
    userId: null,
    userLoading: false,
    userError: null,
    userVerified: null,
    userPhoneNumber: null,
}

export const tokenSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("JWT-TOKEN", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("JWT-TOKEN");
            }
        },
        setUserVerified: (state, action) => {
            state.userVerified = action.payload;
        },

        clearUserName: (state) => {
            state.userName = null;
        },
        clearToken: (state) => {
            state.token = null;
            state.userName = null;
            state.userEmail = null;
            state.userId = null;
            state.userError = null;
            state.userPhoneNumber = null;
            localStorage.removeItem("JWT-TOKEN");
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch user details - pending
            .addCase(fetchUserDetails.pending, (state) => {
                state.userLoading = true;
                state.userError = null;
            })
            // Fetch user details - fulfilled
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userLoading = false;
                // Handle different possible response structures
                state.userName = action.payload?.username || action.payload?.userName || action.payload?.name || "User";
                state.userEmail = action.payload?.emailId || null;
                state.userVerified = action.payload?.aadhaarVerified || false;
                state.userId = action.payload?.id || action.payload?._id || null;
                state.userError = null;
                state.userPhoneNumber = action.payload?.phoneNumber || null;
               
            })
            // Fetch user details - rejected
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = action.payload;
            });
    }
})

export const {
    setToken,
    clearToken,
    setUserName,
    clearUserName,
    setUserVerified,

} = tokenSlice.actions;

// Selectors
export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.userName;
export const selectUserVerified = (state) => state.auth.userVerified;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectUserId = (state) => state.auth.userId;
export const selectUserLoading = (state) => state.auth.userLoading;
export const selectUserError = (state) => state.auth.userError;
export const selectUserPhone = (state) => state.auth.userPhoneNumber;

export default tokenSlice.reducer;