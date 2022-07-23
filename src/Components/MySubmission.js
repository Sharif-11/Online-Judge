import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Submission from "./Submission";
import { userContext } from "./Home";
const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useContext(userContext);

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://lit-meadow-72602.herokuapp.com/contests/${id}/my`, {
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
            <tr>
              <th className="text-sm font-semibold">#</th>
              <th className="text-sm font-semibold">When</th>
              {/* <th className="text-sm font-semibold">Who</th> */}
              <th className="text-sm font-semibold">Problem</th>
              <th className="text-sm font-semibold">Lang</th>
              <th className="text-sm font-semibold">Verdict</th>
              <th className="text-sm font-semibold">Time</th>
              <th className="text-sm font-semibold">Memory</th>
            </tr>
          </thead>
          <tbody>
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
