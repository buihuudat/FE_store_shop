import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ShowCartModal from "../modals/showCartModal";
import ShowProductModal from "../modals/ShowProductModal";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { setUserData } from "../../reducers/userReducer";
const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthApi.getUser();
      if (user) {
        dispatch(setUserData(user));
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <ShowProductModal />
      <ShowCartModal />
    </div>
  );
};

export default AppLayout;
