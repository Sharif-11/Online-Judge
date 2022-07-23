import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpcomingContest = ({ msToTime, idx, contest, time }) => {
  const { startTime, duration } = contest;
  return (
    <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
      <td className="text-[white] underline bg-[transparent] text-[white]">
        {time >= startTime && time <= startTime + duration ? (
          <Link to={`/contests/${contest.id}`}>
            Coding Battle Round #{contest.id}
          </Link>
        ) : (
          `Coding Battle Round #${contest.id}`
        )}
      </td>
      <td className="text-xs font-semibold bg-[transparent] text-[white]">
        {new Date(contest.startTime)
          .toString()
          .replace("(Bangladesh Standard Time)", "")}
      </td>
      <td className="bg-[transparent] text-[white]">
        {msToTime(contest.duration)}
      </td>
      <td className="bg-[transparent] text-[white]">
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
