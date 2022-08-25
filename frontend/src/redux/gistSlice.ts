import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GistState {
  currentGist: Gist | null;
  loading: Boolean;
  error: Boolean;
}

const initialState: GistState = {
  currentGist: null,
  loading: false,
  error: false,
};

export interface Gist {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userId: string;
  title: string;
  desc?: string;
  url: string;
  public: boolean;
}

export const gistSlice = createSlice({
  name: "gist",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<Gist>) => {
      state.loading = false;
      state.currentGist = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = gistSlice.actions;

export default gistSlice.reducer;
