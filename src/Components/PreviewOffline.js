import React from "react";

const PreviewOffline = ({
  title,
  timeLimit,
  memoryLimit,
  description,
  sampleInput,
  sampleOutput,
}) => {
  return (
    <div className="my-3 py-6  mx-0 ">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <p className="text-center">Time limit:{timeLimit} seconds</p>
      <p className="text-center">Memory limit:{memoryLimit} MB</p>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        className="px-8 my-3  shadow-lg py-6"
        style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
      ></div>

      <p className="font-semibold">Sample Input</p>
      <div className="relative">
        <div
          className="px-8 my-3  shadow-lg py-6"
          style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
          dangerouslySetInnerHTML={{
            __html: "<pre>" + sampleInput + "</pre>",
          }}
        ></div>
      </div>
      <p className="font-semibold">Sample Output</p>
      <div className="relative">
        <div
          className="px-8 my-3  shadow-lg py-6"
          style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
          dangerouslySetInnerHTML={{
            __html: "<pre>" + sampleOutput + "</pre>",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PreviewOffline;
