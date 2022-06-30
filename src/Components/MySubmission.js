import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../firebase.init";
import axios from "axios";
import Submission from "./Submission";
const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [user, loading] = useAuthState(auth);

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
  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div className="my-2">
      <div class="overflow-x-auto">
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th className="text-sm font-semibold">#</th>
              <th className="text-sm font-semibold">When</th>
              <th className="text-sm font-semibold">Who</th>
              <th className="text-sm font-semibold">Problem</th>
              <th className="text-sm font-semibold">Lang</th>
              <th className="text-sm font-semibold">Verdict</th>
              <th className="text-sm font-semibold">Time</th>
              <th className="text-sm font-semibold">Memory</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((submission) => (
              <Submission submission={submission} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmission;
