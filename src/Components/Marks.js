import React, { useEffect, useState } from "react";

const Marks = ({ contest, refetch }) => {
  const [time, setTime] = useState(new Date().getTime());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
                {/* <label>
                  <input
                    type="checkbox"
                    class="checkbox checkbox-accent"
                    checked={!!problem?.verdict == "Accepted"}
                    readOnly
                  />
                </label> */}
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
