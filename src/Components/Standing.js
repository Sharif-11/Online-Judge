import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useParams } from "react-router-dom";
import auth from "../firebase.init";

const Standing = ({ contests }) => {
  const [submissions, setSubmissions] = useState([]);
  const { id } = useParams();

  const contest = contests?.filter((a) => a?.id == id)[0];
  const { startTime, duration } = contest;
  console.log(startTime, duration);
  //   console.log(contest);
  useEffect(() => {
    fetch(` http://localhost:5000/contests/${id}/submissions`, {
      method: "GET",
      headers: {
        time: startTime,
        duration,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
      });
  }, []);
  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Who</th>
            <th>Solved</th>
            <th>Penalty</th>
            <th className="w-2">*</th>
            {contest?.problems?.map((problem, idx) => (
              <th>{String.fromCharCode(idx + 65)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>4</th>
            <td>Marjy Ferencz</td>
            <td>Office Assistant I</td>
            <td>Rowe-Schoen</td>
            <td className="w-2"></td>
            {contest?.problems?.map((problem) => (
              <td className="text-[#0a0] font-bold">+</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Standing;
