import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginSlice from '../components/driver/auth/loginSlice';
import locationSlice from '../components/client/locationSlice';
import tripSlice from './slices/tripSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
const createDebugger = require('redux-flipper').default;
const persistConfig = {
    key: "Gideli",
    version: 1.1,
    storage: AsyncStorage,
    whitelist: ['login', 'location']
};
export const rootReducer = combineReducers({
    login: loginSlice,
    location: locationSlice,
    trip: tripSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(createDebugger()),
});
export const persistor = persistStore(store);