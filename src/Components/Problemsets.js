import axios from "axios";
import React, { useEffect, useState } from "react";
import OfflineProblemRow from "./OfflineProblemRow";
import ProblemRow from "./ProblemRow";

const Problemsets = () => {
  const [problems, setProblems] = useState([]);
  const [offlineProblems, setOfflineProblems] = useState([]);
  useEffect(() => {
    axios
      .get("https://cse-326-project-server.vercel.app/problemsets")
      .then(({ data }) => setProblems(data));
    axios
      .get("https://cse-326-project-server.vercel.app/problemsets/offline")
      .then(({ data }) => setOfflineProblems(data));
  }, []);
  problems.sort((a, b) => {
    if (a.id < b.id) return 1;
    return -1;
  });
  return (
    <div>
      <h1 className="font-bold text-center text-xl">Problemsets</h1>
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
              <ProblemRow
                id={problem?.id}
                title={problem?.title}
                rating={problem?.rating}
              />
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="font-bold text-center text-xl">Offline Problems</h1>
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
            {offlineProblems?.map((problem) => (
              <OfflineProblemRow
                id={problem?._id}
                title={problem?.title}
                rating={problem?.rating}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problemsets;
