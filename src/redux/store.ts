import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import blockUISlice from "./slices/blockUISlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["navbarSlice", "authSlice"],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  blockUISlice: blockUISlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
