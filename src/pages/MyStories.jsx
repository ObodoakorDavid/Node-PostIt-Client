/** @format */

import React, { useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

const MyStories = () => {
  const [currentSection, setCurrentSection] = useState("");
  const location = useLocation();
  const { token, baseURL } = useAuth();
  const { data, error, loading } = useFetch(`${baseURL}/api/post/user`, token);
  const paths = {
    all: "/my-stories",
    published: "/my-stories/published",
    drafts: "/my-stories/drafts",
  };

  useEffect(() => {
    if (location.pathname === paths.all) {
      setCurrentSection(paths.all);
    } else if (location.pathname === paths.published) {
      setCurrentSection(paths.published);
    } else if (location.pathname === paths.drafts) {
      setCurrentSection(paths.drafts);
    }
  }, [location.pathname]);

  return (
    <RootLayout>
      <div className="py-4 mw-1240 mx-auto">
        <div className="d-flex align-items-center justify-content-between px-4">
          <h1 className=" fw-bold">My Stories</h1>
          <Link to="/create" className=" btn text-white bg-dark px-4">
            Write Story
          </Link>
        </div>
        <div className="pt-4 d-flex justify-content-start ps-4 gap-3">
          <Link
            to="/my-stories"
            className={`m-0 text-decoration-none text-black ${
              currentSection === paths.all ? "fw-bold" : ""
            }`}
          >
            All
          </Link>
          <Link
            to="drafts"
            className={`m-0 text-decoration-none text-black ${
              currentSection === paths.drafts ? "fw-bold" : ""
            }`}
          >
            Drafts
          </Link>
          <Link
            to="published"
            className={`m-0 text-decoration-none text-black ${
              currentSection === paths.published ? "fw-bold" : ""
            }`}
          >
            Published
          </Link>
        </div>
        <hr className="mx-4" />
        <Outlet context={[data, error, loading]} />
      </div>
    </RootLayout>
  );
};

export default MyStories;
