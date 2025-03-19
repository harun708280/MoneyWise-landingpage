import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { baseApi } from "./Api/baseApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [baseApi.reducerPath]:baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
