/** @format */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  let { token } = useAuth();
  console.log(token);

  if (!token) {
    toast.error(`You have to be logged in to view stories`, {
      position: "top-right",
      id: "unique",
    });
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
