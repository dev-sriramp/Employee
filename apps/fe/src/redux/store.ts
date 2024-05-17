import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import employeeReducer from "./EmployeeReducer";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";

// Define the root reducer
const rootReducer = combineReducers({
  employee: employeeReducer,
  user: userReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the Redux persistor
export const persistor = persistStore(store);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
