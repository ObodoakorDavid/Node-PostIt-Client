/** @format */

import React from "react";
import { useOutletContext } from "react-router-dom";

const DraftUserStories = () => {
  const [data] = useOutletContext();

  return (
    <div>
      {data && data.length < 1 ? (
        <div className="px-4">
          <p className="fw-bold m-0">
            You have no story yet. Lets change that shall we? Click on the write
            story to write your first story.
          </p>
        </div>
      ) : (
        <p> Still Under Construction </p>
      )}
    </div>
  );
};

export default DraftUserStories;
