import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import SetProblem from "./SetProblem";
import { toast } from "react-toastify";
const ArrangeContest = () => {
  const [user, loading] = useAuthState(auth);
  const [cnt, setCnt] = useState(1);
  const [display, setDisplay] = useState(false);
  const [finalContest, setFinalContest] = useState({});
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
  const handleDisabled = () => {
    const id = idRef.current.value;
    const date = dateRef.current.value;
    const hour = parseInt(hourRef.current.value);
    const minute = parseInt(minuteRef.current.value);
    const announce = announceRef.current.value;
    if (id.replace(/\s/g, "").length == 0) {
      setDisabled(true);
      return;
    }
    if (date.replace(/\s/g, "").length == 0) {
      setDisabled(true);
      return;
    }

    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      minute < 0 ||
      hour * 3600000 + minute * 60000 > 3 * 3600000 ||
      hour * 3600000 + minute * 60000 == 0
    ) {
      setDisabled(true);
      return;
    }
    if (announce.replace(/\s/g, "").length == 0) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };
  const handleNext = () => {
    axios
      .get(
        "https://lit-meadow-72602.herokuapp.com/contests?id=" +
          parseInt(idRef?.current.value)
      )

      .then(({ data }) => {
        if (data.length == 0) {
          setError(false);
          return true;
        }
        if (parseInt(data[0]?.id) == parseInt(idRef?.current.value)) {
          setError(true);
          return false;
        } else {
          setError(false);
          return true;
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const date = dateRef.current.value;
    const hour = parseInt(hourRef.current.value);
    const minute = parseInt(minuteRef.current.value);
    const announce = announceRef.current.value;
    var d = new Date(date);

    fetch("https://lit-meadow-72602.herokuapp.com/contests?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        if (parseInt(data[0]?.id) == parseInt(idRef?.current.value)) {
          setError(true);
        } else {
          setError(false);
          const contest = {
            id,
            startTime: d.getTime(),
            duration:
              parseInt(hour) * 60 * 60 * 1000 + parseInt(minute) * 60000,
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
              timeLimit: e.target["time" + i].value,
              memoryLimit: e.target["memory" + i].value,
              testCnt: parseInt(e.target["tc" + i].value),
              testInputSet: [],
              testOutputSet: [],
            };
            for (let j = 0; j < obj.testCnt; j++) {
              obj.testInputSet.push(
                e.target["test-case-in" + i + "-" + j].value
              );
              obj.testOutputSet.push(
                e.target["test-case-out" + i + "-" + j].value
              );
            }
            contest.problems.push(obj);
          }
          axios
            .post("https://lit-meadow-72602.herokuapp.com/contests", contest)
            .then(({ data }) => {
              console.log(data);
              if (data?.acknowledged) {
                setError(false);

                toast.success("Contest added successfully");
              } else {
                setError(true);
                toast.error(`Contest can't be added successfully`);
              }
            });
        }
      });
  };
  return (
    <div className="flex justify-center my-8">
      <form
        className="lg:w-4/5 flex flex-col align-items-center"
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
      >
        <div
          className="p-4 lg:p-8 shadow-lg mx-0 lg:m-4  border-2 "
          style={{ borderRadius: "16px" }}
        >
          <h1 className=" text-xl lg:text-3xl font-semibold text-center mx-3 lg:mx-0">
            Contest Information
          </h1>

          <div
            class={display ? "hidden" : "form-control  my-2 w-full max-w-xs"}
          >
            <label class="label">
              <span class="label-text font-semibold">Enter Contest Id?</span>
            </label>
            <input
              type="number"
              onChange={() => {
                handleDisabled();
                handleNext();
              }}
              min={100}
              placeholder="Enter Contest Id"
              ref={idRef}
              required
              class="input input-bordered w-full max-w-xs"
            />
            {error && (
              <label class="label">
                <span class="label-text-alt text-[red] text-xs">
                  *Contest with this id already exists
                </span>
              </label>
            )}
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
              ref={dateRef}
              onChange={handleDisabled}
              required
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
                step={1}
                class="input input-bordered w-[60px]"
                min={0}
                max={3}
                onChange={handleDisabled}
                ref={hourRef}
                required
              />
              <span className="mx-2">Hours</span>
              <input
                type="number"
                step={15}
                class="input input-bordered w-[75px]"
                min={0}
                max={59}
                required
                onChange={handleDisabled}
                ref={minuteRef}
              />
              <span className="mx-2">Minutes</span>
            </div>
          </div>
          <div class={display ? "hidden" : "form-control lg:w-1/2 my-1"}>
            <label class="label">
              <span class="label-text font-semibold">Enter Announcement</span>
            </label>

            <textarea
              class="textarea textarea-bordered h-24"
              placeholder="Enter Announcement here"
              ref={announceRef}
              required
              onChange={handleDisabled}
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
              min={1}
              name="number"
              max={3}
              value={cnt}
              required
              onChange={(e) => {
                setCnt(e.target.value);
                handleDisabled();
              }}
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
            disabled={
              error ||
              disabled ||
              isNaN(parseInt(cnt)) ||
              parseInt(cnt) > 3 ||
              parseInt(cnt) < 1
            }
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
