import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthApi } from "../../api";
import { setUserData } from "../../reducers/userReducer";
import Navbar from "./Navbar";
import UserSidebar from "./UserSidebar";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AuthApi.getUser();
        setLoading(false);
        dispatch(setUserData(user));
      } catch {
        setLoading(false);
        navigate("/dang-nhap");
      }
    };
    getUser();
  }, []);
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <div>
      <Navbar />
      <Box display={"flex"}>
        <UserSidebar />
        <Outlet />
      </Box>
    </div>
  );
};

export default AuthLayout;
