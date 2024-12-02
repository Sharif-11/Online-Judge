import React, { useContext } from "react";
import { useQuery } from "react-query";
import { userContext } from "./Home";
import Submission from "./Submission";

const Submissions = () => {
  const { user } = useContext(userContext);
  const { data: submissions, isLoading } = useQuery("all-submissions", () =>
    fetch(
      `https://cse-326-project-server.vercel.app/submissions/${user?.displayName}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col py-3">
      <h2 className="mx-auto font-semibold text-xl">
        {user?.displayName} submissions
      </h2>
      <div class="overflow-x-auto my-5">
        <table class="table table-compact w-full">
          <thead>
            <tr className="bg-[#3d4451]">
              <th className="text-xs text-[white] bg-transparent">#</th>
              <th className="text-xs text-[white] bg-transparent">When</th>
              <th className="text-xs text-[white] bg-transparent">Problem</th>
              <th className="text-xs text-[white] bg-transparent">Lang</th>
              <th className="text-xs text-[white] bg-transparent">Verdict</th>
              <th className="text-xs text-[white] bg-transparent">Time</th>
              <th className="text-xs text-[white] bg-transparent">Memory</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {submissions?.map((submission) => (
              <Submission submission={submission} flag={1}></Submission>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
