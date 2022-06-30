import React from "react";
import PreviewProblem from "./PreviewProblem";

const Preview = ({ contest }) => {
  return (
    <div>
      {contest?.problems?.map((problem, idx) => (
        <PreviewProblem {...problem} idx={idx}></PreviewProblem>
      ))}
    </div>
  );
};

export default Preview;
