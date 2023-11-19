import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../constants/rootUrl';
const getLocationUrl = backendUrl + '/api/transport/locations-list/';
const initialState = {
  response: '',
  data: [],
  isLoading: false,
  error: '',
};
export const getLocation = createAsyncThunk(
  'getLocation',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getLocationUrl);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    emptyLocation(state) {
      state.isLoading = false;
      state.data = [];
      state.response = '';
      state.errorInTransfer = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLocation.pending, state => {
        state.isLoading = true;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.response = action.payload.response;
        state.data = action.payload.data;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.response = 'error';
        state.error = { detail: "Error network" };
        state.isLoading = false;
      });
  },
});
export const { emptyLocation } = locationSlice.actions;
export default locationSlice.reducer;
