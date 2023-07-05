/** @format */

import React from "react";
import Footer from "../components/Footer";
import Navbarr from "../components/Navbarr";
import { AuthProvider } from "../context/AuthContext";

const RootLayout = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <Navbarr />
        <hr className="text-secondary m-0" />
        <div>{children}</div>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
