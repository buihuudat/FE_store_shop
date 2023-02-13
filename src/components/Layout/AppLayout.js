import React from "react";
import { Outlet } from "react-router-dom";
import ShowCartModal from "../modals/showCartModal";
import ShowProductModal from "../modals/ShowProductModal";
import Navbar from "./Navbar";
const AppLayout = () => {
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
