import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useContest from "../Hooks/useContest";
const Problems = () => {
  const { id } = useParams();
  const [contest, loading] = useContest(id);

  if (loading) {
    return <p>Loading...</p>;
  }
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
                  <span className="text-[blue] underline">
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
                  <span className="text-[blue] underline">{problem.title}</span>
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
