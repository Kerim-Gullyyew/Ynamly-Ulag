import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../../constants/rootUrl";
const loginUrl = backendUrl + "/api/auth/login/";
const registerUrl = backendUrl + "/api/auth/register-mobile/";
const getUserDataUrl = backendUrl + "/api/auth/user-detail/";
const createtransportUrl = backendUrl + '/api/transport/transport-create/';
const edittransportUrl = backendUrl + '/api/transport/transport-update/';
const deleteTransportUrl = backendUrl + "/api/transport/transport-delete/";
const editTripUrl = backendUrl + '/api/transport/trip-update/';
const toggleTripUrl = backendUrl + '/api/transport/toggle-trip/';
const createRequestUrl = backendUrl + '/api/transport/location-request';
const initialState = {
  response: "",
  refresh: "",
  token: "",
  user: [],
  userData: [],
  isLoading: false,
  error: "",
};
export const userLogin = createAsyncThunk(
  "login",
  async ({ json }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(loginUrl, json);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const userRegister = createAsyncThunk(
  "register",
  async ({ json }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(registerUrl, json);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getUserData = createAsyncThunk(
  "getUserData",
  async ({ token, user_id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(getUserDataUrl + user_id + "/", config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createtransport = createAsyncThunk(
  'createtransport',
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.post(createtransportUrl, formData, config);
      return data;
    } catch (err) {
      return rejectWithValue({ detail: "Ýalňyşlyk ýüze çykdy. Internediňizi barlaň!" });
    }
  },
);
export const edittransport = createAsyncThunk(
  'edittransport',
  async ({ id, token, formData }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.put(
        edittransportUrl + id + '/',
        formData,
        config,
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const deleteTransport = createAsyncThunk(
  'deleteTransport',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      await axios.delete(deleteTransportUrl + id + "/", config);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);


export const editTrip = createAsyncThunk(
  'editTrip',
  async ({ id, token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.put(editTripUrl + id + '/', json, config);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const createRequest = createAsyncThunk(
  'createRequest',
  async ({ token, json }, { rejectWithValue }) => {
    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      console.log(json)
      console.log(config)
      const { data } = await axios.post(createRequestUrl, json, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const toggleTrip = createAsyncThunk(
  'toggleTrip',
  async ({ token, id }, { rejectWithValue }) => {

    try {
      var config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.get(toggleTripUrl + id + '/', config);

      return { data: data, id: id };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser(state) {
      state.response = "";
      state.refresh = "";
      state.token = "";
      state.user = [];
      state.userData = [];
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;
        state.response = action.payload.response;
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createtransport.pending, state => {
        state.isLoading = true;
      })
      .addCase(createtransport.fulfilled, (state, action) => {
        state.error = '';
        state.userData.transports.push({
          created_at: action.payload.data.created_at,
          id: action.payload.data.id,
          image: action.payload.data.image,
          model: action.payload.data.model,
          vehicle_type: action.payload.data.vehicle_type,
        })
        state.isLoading = false;
      })
      .addCase(createtransport.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.data;
        state.isLoading = false;
      })
      .addCase(edittransport.pending, state => {
        state.isLoading = true;
      })
      .addCase(edittransport.fulfilled, (state, action) => {
        state.error = '';
        state.userData.transports = state.userData.transports.map((item) => {
          if (item.id === action.payload.data.id) {
            return ({
              created_at: action.payload.data.created_at,
              id: action.payload.data.id,
              image: action.payload.data.image,
              model: action.payload.data.model,
              vehicle_type: action.payload.data.vehicle_type,
            })
          } else {
            return item
          }
        })
        state.isLoading = false;
      })
      .addCase(edittransport.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
      .addCase(deleteTransport.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTransport.fulfilled, (state, action) => {
        state.error = '';
        // state.userData.transports = state.userData.transports.filter((item) => {
        //   return item.id !== action.payload;
        // })
        state.isLoading = false;
      })
      .addCase(deleteTransport.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
      .addCase(editTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(editTrip.fulfilled, (state, action) => {
        state.error = '';
        state.userData.trips = state.userData.trips.map((trip) => {
          if (action.payload.data.id === trip.id) {
            return action.payload.data;
          }
          return trip
        })
        state.isLoading = false;
      })
      .addCase(editTrip.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
      .addCase(createRequest.pending, state => {
        state.isLoading = true;
      })
      .addCase(createRequest.fulfilled, (state) => {
        state.error = '';
        state.isLoading = false;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
      .addCase(toggleTrip.pending, state => {
        state.isLoading = true;
      })
      .addCase(toggleTrip.fulfilled, (state, action) => {
        state.error = '';
        console.log(action.payload.id);
        state.userData.trips = state.userData.trips.map((trip) => {
          if (action.payload.id === trip.id) {
            return {
              capacity: trip.capacity,
              cargo: trip.cargy,
              description: trip.description,
              from_location: trip.from_location,
              id: trip.id,
              is_active: action.payload.data.is_active,
              is_intercity: trip.is_intercity,
              is_onway: trip.is_onway,
              leaving_time: trip.leaving_time,
              passanger: trip.passanger,
              to_location: trip.to_location,
              transport_id: trip.transport_id
            }
          }
          return trip
        })

          action.payload.data.user_trips.forEach((user_trip) => {
            state.userData.trips = state.userData.trips.map((trip) => {
              if (user_trip.id === trip.id) {
                return {
                  capacity: trip.capacity,
                  cargo: trip.cargo,
                  description: trip.description,
                  from_location: trip.from_location,
                  id: trip.id,
                  is_active: user_trip.is_active,
                  is_intercity: trip.is_intercity,
                  is_onway: trip.is_onway,
                  leaving_time: trip.leaving_time,
                  passanger: trip.passanger,
                  to_location: trip.to_location,
                  transport_id: trip.transport_id
                }
              }
              if (action.payload.id === trip.id) {
                return {
                  capacity: trip.capacity,
                  cargo: trip.cargy,
                  description: trip.description,
                  from_location: trip.from_location,
                  id: trip.id,
                  is_active: action.payload.data.is_active,
                  is_intercity: trip.is_intercity,
                  is_onway: trip.is_onway,
                  leaving_time: trip.leaving_time,
                  passanger: trip.passanger,
                  to_location: trip.to_location,
                  transport_id: trip.transport_id
                }
              }
              return trip
            });
  
          })
        

        state.isLoading = false;
      })
      .addCase(toggleTrip.rejected, (state, action) => {
        state.response = '';
        state.error = action.payload.detail;
        state.isLoading = false;
      })
  },
});
export const { logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
