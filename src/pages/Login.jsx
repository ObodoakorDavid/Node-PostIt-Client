/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, authenticating, token } = useAuth();
  const btnText = authenticating ? "Authenticating..." : "Continue";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("working");
    console.log(errors.email);
    login(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="p-5">
      <h2 className=" fw-bold py-4">Welcome Back</h2>
      <form
        className="d-flex flex-column gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex flex-column gap-1">
          <label className="d-block py-2 fw-semibold" htmlFor="email">
            Your Email Address
          </label>
          <input
            className=" border-0 border-bottom border-secondary border-1 py-2"
            id="email"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className=" text-danger">The field is required!</span>
          )}
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="d-block py-2 fw-semibold" htmlFor="password">
            Password
          </label>
          <input
            className=" border-0 border-bottom border-secondary border-1 py-2"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">The field is required!</span>
          )}
        </div>
        <button
          disabled={authenticating}
          className="btn my-3 btn-bg-main d-flex gap-2 align-items-center justify-content-center"
        >
          <span className="text-white fs-4 fw-semibold">{btnText}</span>
          {authenticating && (
            <span className="spinner-border spinner-border-sm text-white"></span>
          )}
        </button>
      </form>
      <p className="fw-bold">
        No account?
        <Link to="/signup" className="text-decoration-none text-blue ps-2">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
