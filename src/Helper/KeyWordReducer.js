import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: 'keyWords',
  initialState: [],
  reducers: {
    setKeyword: (state, action) => action.payload.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').split(/\s+/),
    removeKeyword: () =>  [],
  }
})

export const { setKeyword, removeKeyword } = reducer.actions;
export default reducer.reducer;