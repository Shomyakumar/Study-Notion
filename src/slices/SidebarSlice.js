import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active:false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    
    setActive(state, value) {
      state.active = value.payload ;
    },
  },
});

export const {  setActive } = sidebarSlice.actions;

export default sidebarSlice.reducer;