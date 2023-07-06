/** @format */

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("token")) || null
  );
  const [authenticating, setaAuthenticating] = useState(false);
  // const baseURL = "http://localhost:3002";
  const baseURL = "https://postitserver.onrender.com";

  const navigate = useNavigate();

  let login = (body) => {
    setaAuthenticating(true);
    setTimeout(async () => {
      let response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      console.log(data);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success(`Welcome ${data.user.username}`, {
          position: "top-right",
          id: "welcome",
        });
        navigate("/dashboard");
      } else {
        toast.error(`invalid Credentials`, {
          position: "top-right",
        });
      }
      setaAuthenticating(false);
    }, 3000);
  };

  // ======================================================================

  let getUser = async () => {
    let response = await fetch(`${baseURL}/api/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      navigate("/login");
      toast.error(`Something went wrong, Please login again`, {
        position: "top-right",
      });
      return;
    }

    let data = await response.json();
    setUser(data.user);
  };

  // ====================================================================

  const signUp = async (body) => {
    setaAuthenticating(true);
    let response = await fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data = await response.json();

    if (response.status === 400) {
      toast.error(`${data.message}`, {
        position: "top-right",
      });
      setaAuthenticating(false);
      return;
    }
    setaAuthenticating(false);

    toast.success(`Registration Successful`, {
      position: "top-right",
      id: "welcome1",
    });
    const formData = {
      email: body.email,
      password: body.password,
    };
    login(formData);
  };

  // =====================================================================

  const logOutUser = () => {
    localStorage.removeItem("token");
    setToken(() => {
      return null;
    });
    setUser(null);
    toast.success("Log Out Successfull", {
      position: "top-right",
    });
    navigate("/");
  };

  const contextData = {
    user,
    login,
    token,
    getUser,
    logOutUser,
    baseURL,
    authenticating,
    signUp,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
