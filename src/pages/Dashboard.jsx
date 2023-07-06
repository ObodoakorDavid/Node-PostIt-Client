/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import scrabble from "../assets/images/scrabble.png";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" d-flex flex-column flex-lg-row gap-2 px-4 pb-4 mx-auto mw-1240">
      <div className="my-5 mx-md-0 text-start">
        <h1 className="fw-bold">Welcome {user && user.username},</h1>
        <p>
          Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas massa
          velit aliquam. Molestim bibendum hnt ipsum orci, platea aliquam id ut.
        </p>
        <div className="d-flex gap-3">
          <Link to="/my-stories" className="btn btn-bg-main text-white px-4 px-sm-5">
            My Stories
          </Link>
          <Link
            to="/stories"
            className="btn bg-white border-main text-blue fw-semibold px-4 px-sm-5 "
          >
            Go to Feed
          </Link>
        </div>
      </div>
      <img className="w-50 mx-auto" src={scrabble} alt="" />
    </div>
  );
};

export default Dashboard;
