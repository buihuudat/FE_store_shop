import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import AuthLayout from "../components/Layout/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import HomePage from "../Pages/HomePage";
import IntroducePage from "../Pages/IntroducePage";
import NewsPage from "../Pages/NewsPage";
import ProductPage from "../Pages/ProductPage";
import SupportPage from "../Pages/SupportPage";
import ProfilePage from "../Pages/user/ProfilePage";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="san-pham" element={<ProductPage />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="gioi-thieu" element={<IntroducePage />} />
        <Route path="ho-tro" element={<SupportPage />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="tai-khoan" element={<ProfilePage />} />
      </Route>
      <Route path="dang-nhap" element={<LoginPage />} />
      <Route path="dang-ky" element={<RegisterPage />} />
    </Routes>
  );
};

export default Routers;
