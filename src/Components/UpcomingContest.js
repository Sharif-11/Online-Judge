import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpcomingContest = ({ msToTime, idx, contest, time }) => {
  return (
    <tr>
      <td className=" underline">
        {contest?.runningStatus.includes("Running") ? (
          <Link to={`/contests/${contest.id}`}>
            {" "}
            `Contest Battle Round #{contest.id}`
          </Link>
        ) : (
          `Contest Battle Round #${contest.id}`
        )}
      </td>
      <td className="text-xs font-semibold">
        {new Date(contest.startTime)
          .toString()
          .replace("(Bangladesh Standard Time)", "")}
      </td>
      <td>{msToTime(contest.duration)}</td>
      <td>
        <span className="text-center block">{contest?.runningStatus}</span>
        <span className="text-center block">
          {contest.runningStatus.includes("Running") ? (
            <span className="block text-center">
              {msToTime(contest?.startTime + contest?.duration - time)}
            </span>
          ) : (
            <span className="block text-center">
              {msToTime(contest?.startTime - time)}
            </span>
          )}
        </span>
      </td>
    </tr>
  );
};

export default UpcomingContest;
