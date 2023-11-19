import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../constants/rootUrl';
const getTripUrl = backendUrl + '/api/transport/trip-list/';
const getTripDetailUrl = backendUrl + '/api/transport/trip-detail/';
const createTripUrl = backendUrl + '/api/transport/trip-create/';

const deleteTripUrl = backendUrl + '/api/transport/trip-delete/';

const initialState = {
  response: '',
  data: [],
  otherdata: [],
  tripDetail: '',
  isLoading: false,
  error: '',
};
export const getTrip = createAsyncThunk(
  'getTrip',
  async ({ link }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getTripUrl + link);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const otherTrip = createAsyncThunk(
  'otherTrip',
  async ({ link }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getTripUrl + link);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const nextAddTrip = createAsyncThunk(
  'nextAddTrip',
  async ({ link }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(link);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const nextAddTripOther = createAsyncThunk(
  'nextAddTripOther',
  async ({ link }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(link);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const getTripDetail = createAsyncThunk(
  'getTripDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getTripDetailUrl + id + '/');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const deleteTrip = createAsyncThunk(
  'deleteTrip',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.delete(deleteTripUrl + id + '/', config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);


export const createTrip = createAsyncThunk(
  'createTrip',
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.post(createTripUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    emptytrip(state) {
      state.isLoading = false;
      state.data = [];
      state.otherdata = [];
      state.response = '';
      state.error = '';
      state.tripDetail = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.otherdata = [];
        state.data = action.payload.data;
        state.error = '';
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.response = '';
        state.error = 'Network Error';
        state.data = [];
        state.otherdata = [];
        state.isLoading = false;
      })
      .addCase(otherTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(otherTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.response;
        state.otherdata = action.payload.data;
        state.error = '';
      })
      .addCase(otherTrip.rejected, (state, action) => {
        state.response = '';
        state.error = 'Network Error';
        state.otherdata = [];
        state.isLoading = false;
      })
      .addCase(nextAddTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(nextAddTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.results = [...state.data.results, ...action.payload.data.results];
        state.data.next = action.payload.data.next;
        state.data.previous = action.payload.data.previous;
        state.error = '';
      })
      .addCase(nextAddTrip.rejected, (state) => {
        state.response = '';
        state.isLoading = false;
      })
      .addCase(nextAddTripOther.pending, state => {
        state.isLoading = true;
      })
      .addCase(nextAddTripOther.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherdata.results = [...state.otherdata.results, ...action.payload.data.results];
        state.otherdata.next = action.payload.data.next;
        state.otherdata.previous = action.payload.data.previous;
        state.error = '';
      })
      .addCase(nextAddTripOther.rejected, (state) => {
        state.response = '';
        state.isLoading = false;
      })
      .addCase(getTripDetail.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTripDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tripDetail = action.payload.data;
        state.error = '';
      })
      .addCase(getTripDetail.rejected, (state) => {
        state.isLoading = false;
      })



      .addCase(createTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.error = '';
        state.response = action.payload.response;
        state.isLoading = false;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
      .addCase(deleteTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.error = '';
        state.response = action.payload.response;
        state.isLoading = false;
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      });
  },
});
export const { emptytrip } = tripSlice.actions;
export default tripSlice.reducer;
