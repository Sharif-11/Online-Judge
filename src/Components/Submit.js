import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "./MonacoEditor";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useContest from "../Hooks/useContest";
import { decode } from "js-base64";
import PreLoader from "./PreLoader";
const Submit = () => {
  const navigate = useNavigate("");
  const [loader, setLoader] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [code, setCode] = useState("");
  const [problem, setProblem] = useState(0);
  const [language, setLanguage] = useState("c");
  const { id } = useParams();
  const [contest, contestLoading] = useContest(id);
  console.dir(contest);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let language_id = 52;
    if (language == "c++") {
      language_id = 54;
    } else if (language == "java") {
      language_id = 62;
    } else if (language == "python") {
      language_id = 71;
    }
    let selectedProblem = contest.problems[parseInt(problem)];
    const { sampleInput, testInputSet, sampleOutput, testOutputSet } =
      selectedProblem;
    console.log(selectedProblem, sampleOutput, testOutputSet);
    const info = {
      email: user?.email,
      handle: user?.displayName,
      submissionTime: new Date().getTime(),
      cpu_time_limit: parseFloat(selectedProblem.timeLimit),
      memory_limit: parseFloat(selectedProblem.memoryLimit) * 1024,
      cpu_extra_time: 2.0,
      source_code: code,
      language_id,
      language,
      problem: parseInt(problem),
      stdin: [sampleInput].concat(testInputSet),
      output: [sampleOutput].concat(testOutputSet),
    };
    fetch(`  https://lit-meadow-72602.herokuapp.com/contests/${id}/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);

        if (data?.acknowledged) {
          navigate(`/contests/${id}/my`);
        }
      });
  };
  const { problems } = contest;
  if (loading || contestLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className="py-4 flex flex-col justify-center">
      <form onSubmit={handleSubmit}>
        <div class="flex w-full max-w-xs  gap-x-1 mx-auto my-2">
          <label class="label">
            <span class="label-text font-semibold">Select Problem</span>
          </label>
          <select
            class="select select-bordered"
            onChange={(e) => setProblem(e.target.value[0].charCodeAt(0) - 65)}
          >
            {problems?.map((problem, idx) => (
              <option selected={idx == 0}>
                {String.fromCharCode(idx + 65)}){problem?.title}
              </option>
            ))}
          </select>
        </div>
        <div class=" w-full max-w-xs  flex   gap-x-1 mx-auto my-2">
          <label class="label ">
            <span class="label-text font-semibold">Select Language</span>
          </label>
          <select
            class="select select-bordered"
            onChange={(e) => setLanguage(e.target.value.toLowerCase())}
          >
            <option selected>C</option>
            <option>C++</option>
            <option>Java</option>
            <option>Python</option>
          </select>
        </div>
        <div class="w-full max-w-xs mx-auto my-2">
          <label class="label align-self-start">
            <span class="label-text font-semibold">Source Code:</span>
          </label>

          <MonacoEditor
            setCode={setCode}
            language={language == "c++" ? "cpp" : language}
          ></MonacoEditor>
        </div>

        <PreLoader loading={loader}></PreLoader>

        <button type="submit" className="btn btn-sm block mx-auto mb-4 mt-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Submit;
