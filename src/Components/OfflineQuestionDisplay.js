import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import Copy from "../Images/Copy.svg";

const OfflineQuestionDisplay = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [copyInput, setCopyInput] = useState(false);
  const [copyOutput, setCopyOutput] = useState(false);
  useEffect(() => {
    axios
      .get(`https://cse-326-project-server.vercel.app/offline-problems/${id}`)
      .then(({ data }) => {
        setProblem(data);
      });
  }, []);
  console.log(problem);
  const {
    title,
    description,
    sampleInput,
    sampleOutput,
    timeLimit,
    memoryLimit,
    testCnt,
    testInputSet,
    testOutputSet,
    rating,
  } = problem;

  return (
    <div className="my-3 py-6  mx-0">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <p className="text-center">Time limit:{timeLimit} seconds</p>
      <p className="text-center">Memory limit:{memoryLimit} MB</p>
      <p className="text-center font-bold">{rating && `Rating: ${rating}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        className="px-8 my-3  shadow-lg py-6"
        style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
      ></div>

      <p className="font-semibold">Sample Input</p>
      <div className="relative">
        <CopyToClipboard
          text={sampleInput}
          onCopy={() => {
            setCopyInput(true);
            setCopyOutput(false);
          }}
        >
          <div
            class="tooltip absolute right-3"
            data-tip={copyInput ? "copied" : "copy to clipboard"}
          >
            <button>
              <img src={Copy} width={24} height={24}></img>
            </button>
          </div>
        </CopyToClipboard>

        <div
          className="px-8 my-3  shadow-lg py-6"
          style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
          dangerouslySetInnerHTML={{ __html: "<pre>" + sampleInput + "</pre>" }}
        ></div>
      </div>
      <p className="font-semibold">Sample Output</p>
      <div className="relative">
        <CopyToClipboard
          text={sampleOutput}
          onCopy={() => {
            setCopyInput(false);
            setCopyOutput(true);
          }}
        >
          <div
            class="tooltip absolute right-3"
            data-tip={copyOutput ? "copied" : "copy to clipboard"}
          >
            <button>
              <img src={Copy} width={24} height={24}></img>
            </button>
          </div>
        </CopyToClipboard>

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

export default OfflineQuestionDisplay;
