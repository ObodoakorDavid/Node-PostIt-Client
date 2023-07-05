/** @format */

import React, { useState } from "react";
import RootLayout from "../layouts/RootLayout";
import editIcon from "../assets/images/edit.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CreateStory = () => {
  const { token, baseURL } = useAuth();
  const navigate = useNavigate();

  // ===============================
  // const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  // ===================================

  const handlePost = async (e) => {
    e.preventDefault();
    const body = { title, tags, story };
    const response = await fetch(`${baseURL}/api/post/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(`${data.message}`, {
        position: "top-right",
      });
      navigate("/my-stories");
      return;
    }
    toast.error(`${data.message[0]}`, {
      position: "top-right",
    });
  };

  return (
    <RootLayout>
      <div className="px-4 text-sm-start mw-1240 mx-auto">
        <h1 className="py-3 fw-bold">Create Story</h1>
        <form
          onSubmit={handlePost}
          className="d-flex flex-column gap-4 pb-5 text-start fw-semibold"
          encType="multipart/form-data"
        >
          <div className=" position-relative">
            <img
              className=" position-absolute bg-white p-1"
              src={editIcon}
              alt=""
            />
            <input
              className="w-100 px-4 py-2 fw-semibold border rounded-1"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="position-relative">
            <img
              className=" position-absolute bg-white p-1"
              src={editIcon}
              alt=""
            />
            <input
              className="w-100 px-4 py-2 fw-semibold border rounded-1"
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className=" position-relative">
            <img
              className=" position-absolute bg-white p-1"
              src={editIcon}
              alt=""
            />
            <textarea
              className="w-100 px-4 py-2 fw-semibold border rounded-1"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Write your story......"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </div>
          {/* =============================== */}
          {/* <div>
            <input
              type="file"
              name=""
              id=""
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div> */}
          {/* ============================== */}
          <button className="btn btn-bg-main w-50 mx-auto text-white">
            Publish Story
          </button>
        </form>
      </div>
    </RootLayout>
  );
};

export default CreateStory;
