/** @format */

import React, { useState } from "react";
import { PulseLoader } from "react-spinners";

const Loading = ({ loading }) => {
  let [color] = useState("#0086b0");

  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <div className="py-5">
      <PulseLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={10}
        height={44}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
