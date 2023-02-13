import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  status: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAddCart: (state, action) => {
      state.carts = action.payload;
    },

    setShowCart: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setAddCart, setShowCart } = CartSlice.actions;
export default CartSlice.reducer;
