import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
