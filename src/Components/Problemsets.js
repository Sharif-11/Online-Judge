import axios from "axios";
import React, { useEffect, useState } from "react";
import ProblemRow from "./ProblemRow";

const Problemsets = () => {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    axios
      .get("https://lit-meadow-72602.herokuapp.com/problemsets")
      .then(({ data }) => setProblems(data));
  }, []);
  problems.sort((a, b) => {
    if (a.id < b.id) return 1;
    return -1;
  });
  return (
    <div>
      <h1 className="font-bold text-center">Problemsets</h1>
      <div class="overflow-x-auto">
        <table class="table table-compact w-full my-3">
          <thead className="bg-[#3d4451] text-white">
            <tr>
              <th className="bg-transparent text-xs text-center">#</th>
              <th className="bg-transparent text-xs text-center">Title</th>
              <th className="bg-transparent text-xs text-center">Rating</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {problems?.map((problem) => (
              <ProblemRow key={problem?._id} {...problem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problemsets;
