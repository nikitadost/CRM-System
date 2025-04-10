import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface UserState {
  usersData: User[] | [];
}

const initialState: UserState = {
  usersData: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.usersData = action.payload;
    },
    clearUsers: (state) => {
      state.usersData = [];
    },
  },
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;
