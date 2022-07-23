import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { timeContext } from "./Home";
import msToTime from "./msToTime";
import findUpcomingContest from "./upcoming";
const PayAttension = () => {
  // const [contests, setContests] = useState([]);
  const { time } = useContext(timeContext);
  const {
    data,
    isLoading,
    refetch: reload,
  } = useQuery("contests", () =>
    fetch("http://localhost:5000/contests").then((res) => res.json())
  );
  const contests = findUpcomingContest(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div
      className="border  bg-[rgb(61,68,81)] border-rounded-sm max-w-[100%]"
      style={{ borderRadius: "8px" }}
    >
      <div className="pl-3 font-semibold text-[white] px-3 py-1">
        Upcoming Contest
      </div>
      <hr />
      {contests?.length > 0 ? (
        contests.slice(0, 3).map((contest) => {
          // contest.startTime <= time && reload();
          // contest.startTime + contest.duration <= time && reload();

          return (
            <div className="content py-2 flex flex-col justify-center">
              <span className="text-[white] font-semibold text-center mx-auto text-md">
                {(contest.runningState == "upcoming" && "Before Contest") ||
                  (contest?.runningState == "running" &&
                    "Contest is Running") ||
                  (contest?.runningState == "ended" && "Contest is ended")}
              </span>
              <span className="text-[white] font-semibold text-xl mx-auto underline">
                {time >= contest.startTime ? (
                  <Link to={`/contests/${contest.id}`}>
                    Contest round #{contest?.id}
                  </Link>
                ) : (
                  `Contest round #${contest?.id}`
                )}
              </span>
              <div className="text-[white] font-semibold text-xl mx-auto">
                {(contest?.startTime >= time &&
                  msToTime(contest.startTime - time)) ||
                  (time >= contest?.startTime &&
                    time <= contest?.startTime + contest?.duration &&
                    msToTime(contest.startTime + contest.duration - time))}
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="py-2 text-center font-semibold text-[gray]">
          No upcoming contest
        </h1>
      )}
    </div>
  );
};

export default PayAttension;
