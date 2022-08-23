import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GistState {

}

const initialState: GistState = {
  
}

export interface Gist {

}

export const gistSlice = createSlice({
  name: 'gist',
  initialState,
  reducers: {
    
  },
})

export const {  } = gistSlice.actions

export default gistSlice.reducer