/** @format */

import React, { useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import toast from "react-hot-toast";
import Loading from "../utils/Loading";
import useAuth from "../hooks/useAuth";

const EditStory = () => {
  const { token, baseURL } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`${baseURL}/api/post/${id}`, token);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTags(data.tags);
      setStory(data.story);
    }
  }, [data]);

  const updateStory = async () => {
    const body = {
      title,
      tags,
      story,
    };
    let response = await fetch(`${baseURL}/api/post/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success(`${data.message}`);
      setTimeout(() => {
        navigate("/my-stories");
      }, 1000);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Oooops! Something went wrong. Please refresh.</p>;
  }

  return (
    <RootLayout>
      {data && (
        <div className="px-4 text-sm-start update-story mw-1240 mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateStory();
            }}
            className="d-flex flex-column gap-4 pb-5"
          >
            <div className="d-flex align-items-center border rounded-1 px-2 py-1 ">
              <label className="fw-bolder text-secondary" htmlFor="title">
                Title:
              </label>
              <input
                id="title"
                className="w-100 px-1 py-2 fw-semibold border-0"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center border rounded-1 px-2 py-1">
              <label className="fw-bolder text-secondary" htmlFor="tags">
                Tags:
              </label>
              <input
                id="tags"
                className="w-100 px-1 py-2 fw-semibold border-0"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <textarea
                className="w-100 p-2 fw-semibold border rounded-1"
                name=""
                id=""
                cols="30"
                rows="10"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-bg-main w-50 mx-auto text-white">
              Update Story
            </button>
          </form>
        </div>
      )}
    </RootLayout>
  );
};

export default EditStory;
