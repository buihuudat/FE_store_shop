import { LinearProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthApi } from "../../api";
import { setUserData } from "../../reducers/userReducer";
import Navbar from "./Navbar";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      navigate("/dang-nhap");
    } else {
      const getUser = async () => {
        const user = await AuthApi.getUser();
        dispatch(setUserData(user));
      };
      getUser();
    }
  }, [navigate, token, dispatch]);
  return (
    loading && (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )
  );
};

export default AuthLayout;
