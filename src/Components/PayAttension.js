import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timeContext } from "./Home";
import msToTime from "./msToTime";
import findUpcomingContest from "./upcoming";
const PayAttension = () => {
  const [contests, setContests] = useState([]);
  const { time } = useContext(timeContext);

  const reload = () => {
    fetch("http://localhost:5000/contests")
      .then((res) => res.json())
      .then((data) => {
        setContests(findUpcomingContest(data));
      });
  };
  useEffect(() => {
    reload();
  }, []);

  return (
    <div
      className="border border-rounded-sm max-w-[100%]"
      style={{ borderRadius: "8px" }}
    >
      <div className="pl-3 font-semibold text-[blue] px-3 py-1">
        Upcoming Contest
      </div>
      <hr />
      {contests?.length > 0 ? (
        contests.slice(0, 3).map((contest) => (
          <div className="content py-2 flex flex-col justify-center">
            <span className="text-[blue] font-semibold text-center mx-auto text-md">
              {(contest.runningState == "upcoming" && "Before Contest") ||
                (contest?.runningState == "running" && "Contest is Running") ||
                (contest?.runningState == "ended" && "Contest is ended")}
            </span>
            <span className="text-[blue] font-semibold text-xl mx-auto underline">
              {time >= contest.startTime ? (
                <Link to={`/contests/${contest.id}`}>
                  Contest round #{contest?.id}
                </Link>
              ) : (
                `Contest round #${contest?.id}`
              )}
            </span>
            <div className="text-[blue] font-semibold text-xl mx-auto">
              {(contest?.runningState == "upcoming" &&
                msToTime(contest.startTime - time)) ||
                (contest?.runningState == "running" &&
                  msToTime(contest.startTime + contest.duration - time))}
              {contest.startTime <= time && reload()}
              {contest.startTime + contest.duration <= time && reload()}
            </div>
          </div>
        ))
      ) : (
        <h1 className="py-2 text-center font-semibold">No upcoming contest</h1>
      )}
    </div>
  );
};

export default PayAttension;
