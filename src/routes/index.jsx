import { Route, Routes } from "react-router-dom";
import React from "react";
import { AdminAuthenticateRoutes, AdminUnAuthenticateRoutes, AuthenticateRoutes, UnAuthenticateRoutes } from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Authenticate/Login";
import Register from "../pages/Authenticate/Register";
import AdminLogin from "../pages/Authenticate/AdminLogin";

import Chat from "../pages/Chat";
import Video from "../pages/Video";
import AdminDashboard from "../pages/AdminDashboard";

const CustomRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<UnAuthenticateRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<AuthenticateRoutes />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/video" element={<Video />} />
          </Route>
          <Route element={<AdminUnAuthenticateRoutes />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          <Route element={<AdminAuthenticateRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
    );
}

export default CustomRoutes