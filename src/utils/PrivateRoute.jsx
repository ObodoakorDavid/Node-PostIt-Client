/** @format */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  let { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;