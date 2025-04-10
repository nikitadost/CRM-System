import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
