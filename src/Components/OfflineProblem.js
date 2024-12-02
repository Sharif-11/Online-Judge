import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const OfflineProblem = () => {
  const [user, loading] = useAuthState(auth);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      email: user?.email,
      status: "pending",
      title: e.target["title"].value,
      description: e.target["description"].value,
      sampleInput: e.target["sample-in"].value,
      sampleOutput: e.target["sample-out"].value,
      timeLimit: e.target["time"].value,
      memoryLimit: e.target["memory"].value,
      rating: e.target["rating"].value,
      testCnt: parseInt(e.target["tc"].value),
      testInputSet: [],
      testOutputSet: [],
    };
    for (let j = 0; j < obj.testCnt; j++) {
      obj.testInputSet.push(e.target["test-case-in" + "-" + j]?.value);
      obj.testOutputSet.push(e.target["test-case-out" + "-" + j]?.value);
    }
    console.log(obj);
    axios
      .post(
        "https://cse-326-project-server.vercel.app/dashboard/add-problem",
        obj
      )
      .then(({ data }) => {
        if (data?.acknowledged) {
          toast.success("Problem added successfully!");
        } else {
          toast.error("Problem does not added successfully!");
        }
      })
      .catch((err) => toast.error(err?.message));
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mx-16">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className="w-full  my-6 shadow-xl lg:p-5 border-2 max-w-[90vw]"
          style={{ borderRadius: "16px" }}
        >
          <div className="p-5">
            <h1 className="text-xl lg:text-2xl font-semibold text-center py-2 lg:py-0">
              Problem
            </h1>
            <div class="form-control w-full max-w-xs lg:w-1/2">
              <label class="label">
                <span class="label-text font-semibold">Enter Title</span>
              </label>
              <input
                type="text"
                name={"title"}
                required
                placeholder="Enter Title"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="form-control w-full max-w-xs lg:w-1/2">
              <label class="label">
                <span class="label-text font-semibold">Enter time limit</span>
              </label>
              <input
                type="number"
                name={"time"}
                min={1}
                max={3}
                required
                placeholder="Enter Time limit in seconds"
                class="input input-bordered w-full max-w-xs"
              />

              <label class="label">
                <span class="label-text font-semibold">Enter memory limit</span>
              </label>
              <input
                type="number"
                name={"memory"}
                required
                min={1}
                max={200}
                placeholder="Enter memory limit in Mb"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="label">
                <span class="label-text font-semibold">Enter rating</span>
              </label>
              <input
                type="number"
                name={"rating"}
                required
                min={800}
                max={2500}
                placeholder="Enter rating"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Enter Description</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                placeholder="Enter Description"
                name={"description"}
                required
              ></textarea>
            </div>
            <div class="form-control lg:w-3/4">
              <label class="label">
                <span class="label-text font-semibold">
                  Enter Sample Test Case(input)
                </span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                placeholder="Enter Description"
                name={"sample-in"}
                required
              ></textarea>
            </div>
            <div class="form-control lg:w-3/4">
              <label class="label">
                <span class="label-text font-semibold">
                  Enter Sample Test Case(output)
                </span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                placeholder="Enter Description"
                name={"sample-out"}
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
                name={"tc"}
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
                    <span class="label-text">
                      Enter Test Case(input) {i + 1}
                    </span>
                  </label>
                  <textarea
                    class="textarea textarea-bordered h-24"
                    name={"test-case-in" + "-" + i}
                    required
                  ></textarea>
                </div>
                <div class="form-control lg:w-3/4">
                  <label class="label">
                    <span class="label-text">
                      Enter Test Case(output) {i + 1}
                    </span>
                  </label>
                  <textarea
                    class="textarea textarea-bordered h-24"
                    name={"test-case-out" + "-" + i}
                    required
                  ></textarea>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex justify-center mb-3">
          <input
            type={"submit"}
            value="Submit"
            className="btn btn-sm btn-dark"
          />
        </div>
      </form>
    </div>
  );
};

export default OfflineProblem;
