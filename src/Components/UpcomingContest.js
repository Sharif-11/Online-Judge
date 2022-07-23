import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpcomingContest = ({ msToTime, idx, contest, time }) => {
  const { startTime, duration } = contest;
  return (
    <tr>
      <td className="text-[#FF00FF] underline">
        {time >= startTime && time <= startTime + duration ? (
          <Link to={`/contests/${contest.id}`}>
            `Coding Battle Round #{contest.id}`
          </Link>
        ) : (
          `Coding Battle Round #${contest.id}`
        )}
      </td>
      <td className="text-xs font-semibold">
        {new Date(contest.startTime)
          .toString()
          .replace("(Bangladesh Standard Time)", "")}
      </td>
      <td>{msToTime(contest.duration)}</td>
      <td>
        <span className="text-center block">
          {time <= startTime
            ? "Before Contest"
            : time <= startTime + duration
            ? "Contest is Running"
            : "Contest is Ended"}
        </span>
        <span className="text-center block">
          {time >= startTime && time <= startTime + duration ? (
            <span className="block text-center">
              {msToTime(contest?.startTime + contest?.duration - time)}
            </span>
          ) : time < startTime ? (
            <span className="block text-center">
              {msToTime(contest?.startTime - time)}
            </span>
          ) : (
            ""
          )}
        </span>
      </td>
    </tr>
  );
};

export default UpcomingContest;
