import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timeContext } from "./Home";
import msToTime from "./msToTime";
import UpcomingContest from "./UpcomingContest";

const ContestsRoute = ({ contests, reload }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);
  const { time } = useContext(timeContext);

  const findUpcoming = () => {
    let up = [];
    let completed = [];
    const time = new Date().getTime();
    for (let i = 0; i < contests?.length; i++) {
      if (contests[i].startTime > time) {
        const remaining = contests[i].startTime - time;
        if (remaining < 7 * 24 * 3600000) {
          contests[i].runningStatus = "Before Contest";
          up.push(contests[i]);
        }
      } else if (time - contests[i].startTime <= contests[i].duration) {
        contests[i].runningStatus = "Contest is Running";
        up.push(contests[i]);
      } else {
        completed.push(contests[i]);
      }
    }
    setFinished(completed);
    setUpcoming(up);
  };

  useEffect(() => {
    findUpcoming();
  }, []);
  return (
    <div class="overflow-x-auto">
      {upcoming.length > 0 && (
        <>
          <h1 className="text-xl font-semibold my-3">Upcoming Contests</h1>
          <table class="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start</th>
                <th>Length</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {upcoming?.map((contest, idx) => (
                <UpcomingContest
                  contest={contest}
                  idx={idx}
                  time={time}
                  msToTime={msToTime}
                ></UpcomingContest>
              ))}
            </tbody>
          </table>
        </>
      )}
      <h1 className="text-xl font-semibold my-3 mt-5">Contests History</h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {finished?.map((contest, idx) => (
            <tr>
              <td className="text-[blue] underline">
                <Link to={`/contests/${contest.id}`}>
                  {`Contest Battle Round #${contest.id}`}
                </Link>
              </td>
              <td className="text-xs font-semibold">
                {new Date(contest.startTime)
                  .toString()
                  .replace("(Bangladesh Standard Time)", "")}
              </td>
              <td>{msToTime(contest.duration)}</td>
              <td className="text-[blue] underline">
                <Link to={`/contests/${contest?.id}/standing`}>
                  Final Standings
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContestsRoute;
