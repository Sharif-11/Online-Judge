import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const OfflineQuestion = () => {
  const { id } = useParams();

  const location = useLocation();
  const [active, setActive] = useState("problems");
  //   useEffect(() => {
  //     let path = location.pathname.replaceAll("/", " ").split(" ")[2];
  //     if (path == "my" || path == "standing" || path == "submit") {
  //       setActive(path);
  //     } else {
  //       setActive("problems");
  //     }
  //   }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div class="tabs my-2">
          <Link
            to={`/offline-problems/${id}`}
            onClick={() => setActive("problems")}
          >
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
            to={`/offline-problems/${id}/submit`}
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
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default OfflineQuestion;
