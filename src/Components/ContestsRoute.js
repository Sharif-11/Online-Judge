import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timeContext } from "./Home";
import msToTime from "./msToTime";
import UpcomingContest from "./UpcomingContest";

const ContestsRoute = ({ contests }) => {
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
              <tr className="bg-[#3d4451]">
                <th className="bg-[transparent] text-[white]">Name</th>
                <th className="bg-[transparent] text-[white]">Start</th>
                <th className="bg-[transparent] text-[white]">Length</th>
                <th className="bg-[transparent] text-[white]"></th>
              </tr>
            </thead>
            <tbody className="bg-[#3d4451] p-0">
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
      <table class="table  w-full">
        <thead>
          <tr className="bg-[#3d4451]">
            <th className="bg-[transparent] text-[white]">Name</th>
            <th className="bg-[transparent] text-[white]">Start</th>
            <th className="bg-[transparent] text-[white]">Length</th>
            <th className="bg-[transparent] text-[white]"></th>
          </tr>
        </thead>
        <tbody className="bg-[#3d4451]">
          {finished?.map((contest, idx) => (
            <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
              <td className="text-[white] underline bg-[transparent] text-[white]">
                <Link to={`/contests/${contest.id}`}>
                  {`Coding Battle Round #${contest.id}`}
                </Link>
              </td>
              <td className="text-xs font-semibold bg-[transparent] text-[white]">
                {new Date(contest.startTime)
                  .toString()
                  .replace("(Bangladesh Standard Time)", "")}
              </td>
              <td className="bg-[transparent] text-[white]">
                {msToTime(contest.duration)}
              </td>
              <td className="text-[white] underline bg-[transparent] text-[white]">
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
