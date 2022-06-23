import React from "react";
import { Link } from "react-router-dom";

const ContestsRoute = ({ contests }) => {
  const msToTime = (time) => {
    let hour, minutes;
    hour = parseInt(time / 3600000);
    time = time % 3600000;
    minutes = parseInt(time / 60000);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${hour}:${minutes}`;
  };
  return (
    <div class="overflow-x-auto">
      <h1 className="text-xl font-semibold my-3">Contests History</h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Start</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contests?.map((contest, idx) => (
            <tr>
              <th>{idx + 1}</th>
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
