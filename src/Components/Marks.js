import React, { useEffect, useState } from "react";

const Marks = ({ contest, refetch }) => {
  const [time, setTime] = useState(new Date().getTime());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
  }, []);

  const getMark = (idx) => {
    if (time - contest.startTime - contest.duration >= 0) {
      return 0;
    }
    let total;
    if (idx == 0) {
      total = 800;
    } else if (idx == 1) {
      total = 1200;
    } else {
      total = 1500;
    }
    const remaining = contest.startTime + contest?.duration - time;
    let marks = (remaining * total) / contest.duration;
    marks = Math.ceil(marks);
    return marks;
  };
  return (
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
                <label>
                  <input type="checkbox" class="checkbox checkbox-accent" />
                </label>
              </th>
              <td className=" font-bold">{String.fromCharCode(idx + 65)}</td>
              <td>
                <span class="badge badge-ghost badge-sm">{getMark(idx)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marks;
