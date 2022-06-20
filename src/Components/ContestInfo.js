import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContest from "../Hooks/useContest";

const ContestInfo = ({ contest, refetch }) => {
  const { id } = useParams();
  const [status, setStatus] = useState("Running");
  const [time, setTime] = useState(new Date().getTime());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
  }, []);
  useEffect(() => {
    if (time >= contest.duration + contest.startTime) {
      setStatus("ended");
    } else if (time >= contest.startTime) {
      setStatus("running");
    }
  }, [contest]);
  const msToTime = (curr) => {
    let hours = parseInt(curr / 3600000);
    curr = curr % 3600000;
    let minutes = parseInt(curr / 60000);
    curr = curr % 60000;
    let seconds = parseInt(curr / 1000);
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div class="card w-72 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="font-bold flex justify-center text-md text-[blue]">
          Contest is {status}
        </h2>
        <p className="text-center text-[blue] font-semibold underline">
          Contest Battle Round #{id}
        </p>
        {status == "running" && (
          <p className="text-center text-[blue] font-bold text-lg">
            {msToTime(contest.startTime + contest.duration - time)}
          </p>
        )}
        {contest.startTime + contest.duration - time >= 0 && refetch()}
      </div>
    </div>
  );
};

export default ContestInfo;
