import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "./MonacoEditor";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
const Submit = () => {
  const navigate = useNavigate("");
  const [user, loading] = useAuthState(auth);
  const [code, setCode] = useState("");
  const [contest, setContest] = useState({});
  const [problem, setProblem] = useState(0);
  const [language, setLanguage] = useState("c");
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://lit-meadow-72602.herokuapp.com/contests?status=published&id=${parseInt(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setContest(data[0]);
      });
  }, []);
  // useEffect(() => {
  //   fetch("https://lit-meadow-72602.herokuapp.com/used")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setSubmission(data?.used);
  //     });
  // }, [outputRef]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // const sourceCode = code;
    // const info = {
    //   language: languageRef.current.value,
    //   sourceCode,
    // };
    const info = {
      email: user?.email,
      code,
      language,
      problem,
      handle: user?.displayName,
      time: new Date().getTime(),
    };
    fetch(` https://lit-meadow-72602.herokuapp.com/contests/${id}/submit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        setCode("");
        navigate(`/contests/${id}/my`);

        console.clear();
        console.log(JSON.parse(data?.body));
      });
  };
  const { problems } = contest;
  if (loading) {
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
        <button type="submit" className="btn btn-sm block mx-auto my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Submit;
