import { TUser } from "@/types/main-types";
import { createSlice } from "@reduxjs/toolkit";

type TState = {
  isLoading: boolean;
  users: TUser[];
};

const initialState: TState = {
  isLoading: false,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingUsers: (state, action) => {
      state.isLoading = action.payload;
    },
    storeUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loadingUsers, storeUsers } = userSlice.actions;

export default userSlice.reducer;
