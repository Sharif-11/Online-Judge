import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContest from "../Hooks/useContest";
import { timeContext } from "./Home";

const Marks = () => {
  const { id } = useParams();
  const [contest, loading] = useContest(id);
  const { time } = useContext(timeContext);
  const getMark = (idx) => {
    // if (time - contest.startTime - contest.duration >= 0) {
    //   return 0;
    // }
    let total, deduce;
    if (idx == 0) {
      total = 500;
      deduce = 2;
    } else if (idx == 1) {
      total = 1000;
      deduce = 4;
    } else {
      total = 1500;
      deduce = 6;
    }
    const elapsedTime = parseInt((time - contest.startTime) / 60000);
    return Math.max(total - elapsedTime * deduce, (total * 30) / 100);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {time <= contest.startTime + contest.duration ? (
        <div class="overflow-x-auto w-full my-6 shadow-lg">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Problem</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {contest?.problems?.map((problem, idx) => (
                <tr>
                  <th>
                    {/* <label>
                  <input
                    type="checkbox"
                    class="checkbox checkbox-accent"
                    checked={!!problem?.verdict == "Accepted"}
                    readOnly
                  />
                </label> */}
                  </th>
                  <td className=" font-bold">
                    {String.fromCharCode(idx + 65)}
                  </td>
                  <td>
                    <span class="badge badge-ghost badge-sm">
                      {getMark(idx)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Marks;
