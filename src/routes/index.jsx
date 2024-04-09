import { Route, Routes } from "react-router-dom";
import React from "react";
import { AuthenticateRoutes, UnAuthenticateRoutes } from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Authenticate/Login";
import Register from "../pages/Authenticate/Register";

import Chat from "../pages/Chat";
import Video from "../pages/Video";

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
        </Routes>
    );
}

export default CustomRoutes