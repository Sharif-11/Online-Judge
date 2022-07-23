import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useContest from "../Hooks/useContest";
const Problems = ({ contests }) => {
  const { id } = useParams();
  const contest = contests?.filter((a) => parseInt(a?.id) == parseInt(id))[0];
  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full my-2">
        <thead>
          <tr className="bg-[#3d4451]">
            <th className="bg-[transparent] text-[white]">#</th>
            <th className="bg-[transparent] text-[white]">Name</th>
            <th className="bg-[transparent] text-[white]">Time</th>
            <th className="bg-[transparent] text-[white]">Memory</th>
          </tr>
        </thead>
        <tbody className="bg-[#3d4451]">
          {contest?.problems?.map((problem, idx) => (
            <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
              <th className="text-[white] bg-[transparent]">
                <Link
                  to={`/contests/${id}/problem/${String.fromCharCode(
                    idx + 65
                  )}`}
                >
                  <span className="text-[white] underline">
                    {String.fromCharCode(idx + 65)}
                  </span>
                </Link>
              </th>
              <td className="text-[white] bg-[transparent]">
                <Link
                  to={`/contests/${id}/problem/${String.fromCharCode(
                    idx + 65
                  )}`}
                >
                  <span className="text-[white] underline">
                    {problem.title}
                  </span>
                </Link>
              </td>
              <td className="font-semibold text-[white] bg-[transparent]">
                {problem.timeLimit + "s"}
              </td>
              <td className="font-semibold text-[white] bg-[transparent]">
                {problem.memoryLimit + "MB"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
