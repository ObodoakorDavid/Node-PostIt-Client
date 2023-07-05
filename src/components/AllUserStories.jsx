/** @format */

import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../utils/Loading";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const AllUserStories = () => {
  const { token, baseURL } = useAuth();
  const navigate = useNavigate();
  const [data, error, loading] = useOutletContext();

  const deletePost = async (id) => {
    const response = await fetch(`${baseURL}/api/post/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success(`${data.message}`, {
        position: "top-right",
      });
      setTimeout(() => {
        navigate(0);
      }, 1000);
      return;
    }
    toast.error(`An Error Occurred`, {
      position: "top-right",
    });
  };
  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      {data && data.length > 0 && (
        <div className="py-4 d-flex flex-column gap-4">
          {data.map((eachStory) => {
            const { _id, title, story } = eachStory;
            return (
              <div
                key={_id}
                className="d-flex flex-column flex-sm-row text-start justify-content-between align-items-start px-4"
              >
                <div>
                  <h1 className="fw-semibold">{title}</h1>
                  <p>{story}</p>
                </div>
                <div className="d-flex text-start gap-3 align-items-center">
                  <Link
                    to={`/edit/${_id}`}
                    className="btn btn-bg-main text-white px-4 fw-semibold"
                  >
                    Edit Post
                  </Link>
                  <button
                    onClick={() => {
                      deletePost(_id);
                    }}
                    className="btn border-main text-blue fw-semibold px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {data && data.length < 1 && (
        <div className="px-4">
          <p className="fw-bold">
            You have no story yet. Lets change that shall we? Click on the write
            story to write your first story.
          </p>
        </div>
      )}

      {error && (
        <p className="pt-5 text-blue fw-bold fs-3">
          Oooops! Something Went Wrong, Please Refresh.
        </p>
      )}
    </div>
  );
};

export default AllUserStories;
