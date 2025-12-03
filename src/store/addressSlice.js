import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// Async thunk to fetch all digital addresses
export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        throw new Error("No token available");
      }

      const response = await api.get("/api/digital-address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data || [];
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch addresses";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.lastFetchTime = null;
    },
    addAddress: (state, action) => {
      // Add new address to the beginning of the list
      state.addresses.unshift(action.payload);
    },
    removeAddress: (state, action) => {
      // Remove address by digitalAddress or id
      state.addresses = state.addresses.filter(
        (addr) =>
          addr.digitalAddress !== action.payload &&
          addr.id !== action.payload &&
          addr._id !== action.payload
      );
    },
    updateAddress: (state, action) => {
      // Update existing address
      const index = state.addresses.findIndex(
        (addr) =>
          addr.digitalAddress === action.payload.digitalAddress ||
          addr.id === action.payload.id ||
          addr._id === action.payload._id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all addresses - pending
      .addCase(fetchAllAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch all addresses - fulfilled
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.lastFetchTime = new Date().getTime();
        state.error = null;
      })
      // Fetch all addresses - rejected
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddresses, addAddress, removeAddress, updateAddress } =
  addressSlice.actions;

// Selectors
export const selectAddresses = (state) => state.address.addresses;
export const selectAddressLoading = (state) => state.address.loading;
export const selectAddressError = (state) => state.address.error;
export const selectLastFetchTime = (state) => state.address.lastFetchTime;
export const selectHighestConfidenceAddress = (state) => {
  const addresses = state.address.addresses;
  if (addresses.length === 0) return null;

  return addresses.reduce((prev, current) => {
    const prevScore = prev.confidenceScore || 0;
    const currentScore = current.confidenceScore || 0;
    return currentScore > prevScore ? current : prev;
  });
};

export default addressSlice.reducer;
