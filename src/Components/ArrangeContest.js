import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import SetProblem from "./SetProblem";

const ArrangeContest = () => {
  const [user, loading] = useAuthState(auth);
  const [cnt, setCnt] = useState(1);
  const [display, setDisplay] = useState(false);
  const [finalContest, setFinalContest] = useState({});
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < parseInt(cnt); i++) {
      arr.push(0);
      if (arr.length >= 3) break;
    }
    setProblems(arr);
  }, [cnt]);
  const idRef = useRef("100");
  const dateRef = useRef("");
  const hourRef = useRef("");
  const minuteRef = useRef("");
  const announceRef = useRef("");
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const date = dateRef.current.value;
    const hour = hourRef.current.value;
    const minute = minuteRef.current.value;
    const announce = announceRef.current.value;
    console.clear();
    var d = new Date(date);
    console.log(id, date, hour, minute, announce);
    const contest = {
      id,
      startTime: d.getTime(),
      duration: parseInt(hour) * 60 * 60 * 1000 + parseInt(minute) * 60000,
      announcement: announce,
      status: "pending",
      email: user?.email,
      problems: [],
    };

    for (let i = 0; i < problems.length; i++) {
      let obj = {
        title: e.target["title" + i].value,
        description: e.target["description" + i].value,
        sampleInput: e.target["sample-in" + i].value,
        sampleOutput: e.target["sample-out" + i].value,
        testCnt: parseInt(e.target["tc" + i].value),
        testInputSet: [],
        testOutputSet: [],
      };
      for (let j = 0; j < obj.testCnt; j++) {
        obj.testInputSet.push(e.target["test-case-in" + i + "-" + j].value);
        obj.testOutputSet.push(e.target["test-case-out" + i + "-" + j].value);
      }
      contest.problems.push(obj);
    }
    axios
      .post("http://localhost:5000/contests", contest)
      .then(({ data }) => {});
  };
  return (
    <div className="flex justify-center my-4">
      <form
        className="w-4/5 flex flex-col align-items-center"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="p-8 shadow-lg m-4" style={{ borderRadius: "16px" }}>
          <h1 className="text-3xl font-semibold text-center">
            Contest Information
          </h1>
          <div class={display ? "hidden" : "form-control w-full max-w-xs"}>
            <label class="label">
              <span class="label-text font-semibold">Enter Contest Id?</span>
            </label>
            <input
              type="number"
              min={100}
              placeholder="Enter Contest Id"
              ref={idRef}
              required
              class="input input-bordered w-full max-w-xs"
            />
            <label class="label">
              <span class="label-text-alt text-[red]">
                *Contest with this id already exists
              </span>
            </label>
          </div>
          <div class={display ? "hidden" : "form-control w-full max-w-xs"}>
            <label class="label">
              <span class="label-text font-semibold">
                Enter Contest Start Time?
              </span>
            </label>
            <input
              type="datetime-local"
              class="input input-bordered w-full max-w-xs"
              required
              ref={dateRef}
            />
          </div>

          <div class={display ? "hidden" : "form-control w-full max-w-xs"}>
            <label class="label">
              <span class="label-text font-semibold">
                Enter Contest Duration?
              </span>
            </label>
            <div>
              <input
                type="number"
                class="input input-bordered w-[60px]"
                min={0}
                max={3}
                required
                ref={hourRef}
              />
              <span className="mx-2">Hours</span>
              <input
                type="number"
                class="input input-bordered w-[75px]"
                min={0}
                max={60}
                ref={minuteRef}
                required
              />
              <span className="mx-2">Minutes</span>
            </div>
          </div>
          <div class={display ? "hidden" : "form-control w-1/2 my-1"}>
            <label class="label">
              <span class="label-text font-semibold">Enter Announcement</span>
            </label>

            <textarea
              class="textarea textarea-bordered h-24"
              placeholder="Enter Announcement here"
              required
              ref={announceRef}
            ></textarea>
          </div>
          <div class={display ? "hidden" : "form-control w-full max-w-xs"}>
            <label class="label">
              <span class="label-text font-semibold">
                Enter Number of Problems?
              </span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              required
              min={1}
              name="number"
              max={3}
              onChange={(e) => setCnt(e.target.value)}
              class="input input-bordered w-full max-w-xs"
            />
            <label class="label">
              <span class="label-text-alt text-[red]">
                *problems must be between 1 and 3
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className={display ? "hidden" : "btn btn-dark my-3"}
            onClick={() => setDisplay(true)}
          >
            Next
          </button>
        </div>
        {problems.map((problem, idx) => (
          <SetProblem id={idx} display={display}></SetProblem>
        ))}
        <div className="flex justify-center">
          {display && (
            <button
              type="button"
              className="btn btn-dark my-5 max-w-xs mr-3"
              onClick={() => setDisplay(false)}
            >
              Previous
            </button>
          )}

          {display && (
            <button type="submit" className="btn btn-dark my-5 max-w-xs">
              Submit
            </button>
          )}
        </div>
      </form>

      <input type="checkbox" id="my-modal-5" class="modal-toggle" />
    </div>
  );
};

export default ArrangeContest;
