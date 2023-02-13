import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProduct: {
    open: false,
    product: {},
  },
};
const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowProduct: (state, action) => {
      state.showProduct = action.payload;
    },
  },
});

export const { setShowProduct } = ModalSlice.actions;
export default ModalSlice.reducer;
