import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useChat } from "../contextApi/ChatContext";

const AuthenticateRoutes = () => {
    const {user, setUser} = useChat()
    const logged_user = window.sessionStorage.getItem('logged_user');
    if ( user ) {
        return <Outlet />;
    } else {
        if ( logged_user ) {
            setUser(JSON.parse(logged_user));
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    }
}

const UnAuthenticateRoutes = () => {
    const {user, setUser} = useChat()
    const logged_user = sessionStorage.getItem('logged_user');
    if ( user ) {
        return <Navigate to="/" />;
    } else {
        if ( logged_user ) {
            setUser(JSON.parse(logged_user));
            return <Navigate to="/" />;
        } else {
            return <Outlet />;
        }
    }
}

export {
    AuthenticateRoutes,
    UnAuthenticateRoutes
}