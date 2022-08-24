import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GistState {

}

const initialState: GistState = {

}

export interface Gist {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  userId: string,
  title: string
  desc?: string
  url: string
  public: boolean
}

export const gistSlice = createSlice({
  name: 'gist',
  initialState,
  reducers: {

  },
})

export const { } = gistSlice.actions

export default gistSlice.reducer