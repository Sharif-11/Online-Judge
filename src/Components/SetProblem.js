import React, { useEffect, useState } from "react";

const SetProblem = ({ id, display }) => {
  const [cnt, setCnt] = useState(1);
  const [tc, setTc] = useState([]);
  useEffect(() => {
    let arr = [];

    for (let i = 0; i < parseInt(cnt); i++) {
      arr.push(0);
      if (arr.length >= 3) break;
    }
    setTc(arr);
  }, [cnt]);
  return (
    <div
      className={
        display
          ? "w-full  my-6 shadow-xl lg:p-5 border-2 max-w-[90vw]"
          : "hidden"
      }
      style={{ borderRadius: "16px" }}
    >
      <div className="p-5">
        <h1 className="text-xl lg:text-2xl font-semibold text-center py-2 lg:py-0">
          Problem {id + 1}
        </h1>
        <div class="form-control w-full max-w-xs lg:w-1/2">
          <label class="label">
            <span class="label-text font-semibold">
              Enter Title for Problem {id + 1}?
            </span>
          </label>
          <input
            type="text"
            name={"title" + id}
            required
            placeholder="Enter Title"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">
              Enter Description for problem {id + 1}
            </span>
          </label>
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Enter Description"
            name={"description" + id}
            required
          ></textarea>
        </div>
        <div class="form-control lg:w-3/4">
          <label class="label">
            <span class="label-text font-semibold">
              Enter Sample Test Case(input) for problem {id + 1}
            </span>
          </label>
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Enter Description"
            name={"sample-in" + id}
            required
          ></textarea>
        </div>
        <div class="form-control lg:w-3/4">
          <label class="label">
            <span class="label-text font-semibold">
              Enter Sample Test Case(output) for problem {id + 1}
            </span>
          </label>
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Enter Description"
            name={"sample-out" + id}
            required
          ></textarea>
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text font-semibold">
              Enter Number Of test Cases
            </span>
          </label>
          <input
            type="number"
            required
            min={1}
            max={3}
            name={"tc" + id}
            onChange={(e) => setCnt(e.target.value)}
            class="input input-bordered w-full max-w-xs"
          />
          <label class="label">
            <span class="label-text-alt text-[red]">
              *must be between 1 and 3
            </span>
          </label>
        </div>
        {tc.map((t, i) => (
          <>
            <div class="form-control lg:w-3/4">
              <label class="label">
                <span class="label-text">Enter Test Case(input) {i + 1}</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                name={"test-case-in" + id + "-" + i}
                required
              ></textarea>
            </div>
            <div class="form-control lg:w-3/4">
              <label class="label">
                <span class="label-text">Enter Test Case(output) {i + 1}</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                name={"test-case-out" + id + "-" + i}
                required
              ></textarea>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SetProblem;
