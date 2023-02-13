import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import menuReducer from "./reducers/menuReducer";
import modalReducer from "./reducers/modalReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    cart: cartReducer,
    menu: menuReducer,
  },
});
