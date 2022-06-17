import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const Problems = () => {
  const { id } = useParams();

  const [contest, setContest] = useState({});
  useEffect(() => {
    fetch(` https://lit-meadow-72602.herokuapp.com/contests?id=${parseInt(id)}`)
      .then((res) => res.json())
      .then((data) => setContest(data[0]));
  }, []);
  console.log(contest);
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
                    {" "}
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
              <td>{"1s"}</td>
              <td>{"234MB"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
