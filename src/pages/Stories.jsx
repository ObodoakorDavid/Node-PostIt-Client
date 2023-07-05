/** @format */

import React from "react";
import RootLayout from "../layouts/RootLayout";
import StoryCard from "../components/StoryCard";
import scrabble from "../assets/images/scrabble.png";
import { useFetch } from "../hooks/useFetch";
import Loading from "../utils/Loading";
import useAuth from "../hooks/useAuth";

const Stories = () => {
  const { baseURL } = useAuth();
  const { data, loading, error } = useFetch(`${baseURL}/api/post/`);

  return (
    <RootLayout>
      <div className="bg-light">
        <div className=" d-flex flex-column align-items-center flex-lg-row gap-2 px-4 mb-5 mx-auto mw-1240">
          <div className="my-5 mx-md-0 text-start">
            <h1 className="fw-bold">
              You've got a story, Post<span className="text-blue">it</span>.
            </h1>
            <p>
              Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas
              massa velit aliquam. Molestim bibendum hnt ipsum orci, platea
              aliquam id ut.
            </p>
          </div>
          <img className="w-50 mx-auto" src={scrabble} alt="" />
        </div>
      </div>
      {data && (
        <div className="px-4 mx-auto mw-1240">
          <div className="row">
            {data.map((eachStory) => {
              return <StoryCard key={eachStory._id} story={eachStory} />;
            })}
          </div>
        </div>
      )}
      {loading && <Loading />}
      {error && (
        <p className="pt-5 text-blue fw-bold fs-3">
          Oooops! Something Went Wrong, Please Refresh.
        </p>
      )}
    </RootLayout>
  );
};

export default Stories;
