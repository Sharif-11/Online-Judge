import React, { useEffect, useState } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
const Contest = () => {
  const { id } = useParams();

  const location = useLocation();
  const [active, setActive] = useState("problems");
  useEffect(() => {
    let path = location.pathname.replaceAll("/", " ").split(" ")[3];
    if (path == "my" || path == "standing" || path == "submit") {
      setActive(path);
    } else {
      setActive("problems");
    }
  }, [location]);

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
                active == "my-submission" || active == "my"
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
