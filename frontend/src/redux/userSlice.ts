import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: User | null;
  loading: Boolean;
  error: Boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  gists: string[];
  updatedAt: string;
  fromGoogle: boolean;
  fromGithub: boolean;
  __v: number;
  img?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
