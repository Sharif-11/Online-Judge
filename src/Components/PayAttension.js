import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const PayAttension = () => {
  const [contests, setContests] = useState([]);

  const [time, setTime] = useState(new Date().getTime());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
  }, []);

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
  const reload = () => {
    fetch(" https://lit-meadow-72602.herokuapp.com/contests?status=published")
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        const now = new Date().getTime();
        for (let i = 0; i < data.length; i++) {
          if (Math.abs(data[i].startTime - now) <= 23 * 3600000) {
            if (data[i].startTime > now) {
              data[i].runningState = "upcoming";
              arr.push(data[i]);
            } else if (now - data[i].startTime >= data[i].duration) {
              data[i].runningState = "ended";
              arr.push(data[i]);
            } else if (data[i].startTime <= now) {
              data[i].runningState = "running";
              arr.push(data[i]);
            }
          }
        }
        setContests(arr);
      });
  };
  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="border border-rounded-sm" style={{ borderRadius: "8px" }}>
      <div className="pl-3 font-semibold text-[blue] px-3 py-1">
        Upcoming Contest
      </div>
      <hr />
      {contests.slice(0, 3).map((contest) => (
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
      ))}
    </div>
  );
};

export default PayAttension;
