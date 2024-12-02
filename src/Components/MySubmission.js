import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "./Home";
import Submission from "./Submission";
const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useContext(userContext);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://cse-326-project-server.vercel.app/contests/${id}/my`, {
      method: "GET",
      headers: {
        email: user?.email,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
      });
  }, []);

  return (
    <div className="my-2">
      <div class="overflow-x-auto">
        <table class="table table-compact w-full">
          <thead>
            <tr className="bg-[#3d4451]">
              <th className="text-sm font-semibold bg-transparent text-white">
                #
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                When
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                Problem
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                Lang
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                Verdict
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                Time
              </th>
              <th className="text-sm font-semibold bg-transparent text-white">
                Memory
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {submissions?.map((submission) => (
              <Submission submission={submission} flag={1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmission;
