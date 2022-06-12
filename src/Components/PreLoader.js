import React from "react";
import { ClipLoader } from "react-spinners";

const PreLoader = (loading) => {
  return (
    <div className="flex justify-center my-[8px]">
      <ClipLoader loading={loading} size={24} />
    </div>
  );
};

export default PreLoader;
