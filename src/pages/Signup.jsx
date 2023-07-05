/** @format */

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { signUp, token, authenticating } = useContext(AuthContext);
  // const isAuthenticating = authenticating ? "spinner-border mx-auto" : "";
  const btnText = authenticating ? "Please wait..." : "Continue";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("working");
    console.log(errors.email);
    signUp(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="p-5">
      <h2 className="fw-bold py-4">
        Join Post<span className="text-blue">it</span>
      </h2>
      <p className=" fw-semibold">
        Enter your email address to create an account on Post
        <span className="text-blue">it</span>.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-3"
      >
        <div className="d-flex flex-column gap-1">
          <label className="d-block py-2 fw-semibold" htmlFor="username">
            Username
          </label>
          <input
            className=" border-0 border-bottom border-secondary border-1 py-2"
            id="username"
            type="text"
            {...register("username", {
              required: true,
            })}
          />
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="d-block py-2 fw-semibold" htmlFor="email">
            Email
          </label>
          <input
            className=" border-0 border-bottom border-secondary border-1 py-2"
            id="email"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="d-block py-2 fw-semibold" htmlFor="password">
            Password
          </label>
          <input
            className=" border-0 border-bottom border-secondary border-1 py-2"
            id="password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <button
          disabled={authenticating}
          className="btn my-3 btn-bg-main d-flex gap-2 align-items-center justify-content-center"
        >
          {authenticating && (
            <span className="spinner-border spinner-border-sm text-white"></span>
          )}
          <span className="text-white fs-4 fw-semibold">{btnText}</span>
        </button>
      </form>
      <p className="fw-bold">
        Already have an account?
        <Link to="/login" className="text-decoration-none text-blue ps-2">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
