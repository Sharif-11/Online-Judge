import React, { useEffect, useState } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
const Contest = () => {
  const { id } = useParams();
  const [contest, setContest] = useState({});
  const [active, setActive] = useState("problems");

  return (
    <div>
      <div className="flex justify-center">
        <div class="tabs my-2">
          <Link to={`/contests/${id}`} onClick={() => setActive("problems")}>
            <a
              class={
                active == "problems"
                  ? "tab font-semibold tab-lg tab-bordered tab-active"
                  : "tab font-semibold tab-lg tab-bordered"
              }
            >
              Problems
            </a>
          </Link>
          <Link
            to={`/contests/${id}/submit`}
            onClick={() => setActive("submit")}
          >
            <a
              class={
                active == "submit"
                  ? "tab font-semibold tab-lg tab-bordered tab-active"
                  : "tab font-semibold tab-lg tab-bordered"
              }
            >
              Submit
            </a>
          </Link>
          <Link
            to={`/contests/${id}/my`}
            onClick={() => setActive("my-submission")}
          >
            <a
              class={
                active == "my-submission"
                  ? "tab font-semibold tab-lg tab-bordered tab-active"
                  : "tab font-semibold tab-lg tab-bordered"
              }
            >
              My Submission
            </a>
          </Link>
          <Link
            to={`/contests/${id}/standing`}
            onClick={() => setActive("standing")}
          >
            <a
              class={
                active == "standing"
                  ? "tab font-semibold tab-lg tab-bordered tab-active"
                  : "tab font-semibold tab-lg tab-bordered"
              }
            >
              Standing
            </a>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Contest;
