import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  type: "new",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setMenuType } = menuSlice.actions;
export default menuSlice.reducer;
