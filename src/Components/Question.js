import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import Copy from "../Images/Copy.svg";
const Question = () => {
  const { id, ch } = useParams();
  const [problem, setProblem] = useState({});
  const [copyInput, setCopyInput] = useState(false);
  const [copyOutput, setCopyOutput] = useState(false);
  useEffect(() => {
    fetch(
      `https://lit-meadow-72602.herokuapp.com/contests?status=published&id=${parseInt(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.clear();

        setProblem(data[0]?.problems[ch.charCodeAt(0) - 65]);
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
  } = problem;
  console.log(
    title,
    description,
    sampleInput,
    sampleOutput,
    testCnt,
    timeLimit,
    memoryLimit
  );

  return (
    <div className="my-3 py-6">
      <h1 className="text-2xl font-bold text-center">
        {ch}){title}
      </h1>
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

export default Question;
