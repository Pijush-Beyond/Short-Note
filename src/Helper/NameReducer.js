import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: 'name',
  initialState: localStorage.getItem('name') || '',
  reducers: {
    setName: (state, action) => {
      if (action.payload !== 'Guest')
        localStorage.setItem('name', action.payload)
      return action.payload;
    },
    removeName: () => '',
  }
})

export default reducer.reducer;
export const { setName,removeName } = reducer.actions;