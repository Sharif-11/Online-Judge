import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { userContext } from "./Home";
import Submission from "./Submission";

const Submissions = () => {
  const { user } = useContext(userContext);
  const { data: submissions, isLoading } = useQuery("all-submissions", () =>
    fetch(
      `https://lit-meadow-72602.herokuapp.com/submissions/${user?.displayName}`
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
            <tr>
              <th className="text-xs">#</th>
              <th className="text-xs">When</th>
              <th className="text-xs">Problem</th>
              <th className="text-xs">Lang</th>
              <th className="text-xs">Verdict</th>
              <th className="text-xs">Time</th>
              <th className="text-xs">Memory</th>
            </tr>
          </thead>
          <tbody>
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
