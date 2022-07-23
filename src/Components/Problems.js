import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useContest from "../Hooks/useContest";
const Problems = ({ contests }) => {
  const { id } = useParams();
  const contest = contests?.filter((a) => parseInt(a?.id) == parseInt(id))[0];
  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Memory</th>
          </tr>
        </thead>
        <tbody>
          {contest?.problems?.map((problem, idx) => (
            <tr>
              <th>
                <Link
                  to={`/contests/${id}/problem/${String.fromCharCode(
                    idx + 65
                  )}`}
                >
                  <span className="text-[#DA70D6] underline">
                    {String.fromCharCode(idx + 65)}
                  </span>
                </Link>
              </th>
              <td>
                <Link
                  to={`/contests/${id}/problem/${String.fromCharCode(
                    idx + 65
                  )}`}
                >
                  <span className="text-[#DA70D6] underline">
                    {problem.title}
                  </span>
                </Link>
              </td>
              <td className="font-semibold">{problem.timeLimit + "s"}</td>
              <td className="font-semibold">{problem.memoryLimit + "MB"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
