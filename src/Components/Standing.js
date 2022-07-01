import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useParams } from "react-router-dom";
import auth from "../firebase.init";

const Standing = ({ contests }) => {
  const [submissions, setSubmissions] = useState([]);
  const { id } = useParams();

  const contest = contests?.filter((a) => a?.id == id)[0];
  const { startTime, duration } = contest;
  // console.log(startTime, duration);
  //   console.log(contest);
  useEffect(() => {
    console.log(startTime);
    fetch(`https://lit-meadow-72602.herokuapp.com/submissions`, {
      method: "GET",
      headers: {
        startTime,
        duration,
        id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
      });
  }, []);
  console.dir(submissions);

  let sz = submissions.length;
  let cnt = contest?.problems?.length;
  for (let i = 0; i < sz; i++) {
    const handle = submissions[i]._id.handle;
    let marks = 0;
    let accepted = [];
    let ttl = submissions[i].submissions.length;
    let visit = [-1, -1, -1];
    submissions[i].submissions.sort(
      (a, b) => b.submissionTime - a.submissionTime
    );
    for (let j = 0; j < ttl; j++) {
      let submission = submissions[i].submissions[j];
      if (submission.verdict == "Accepted") {
        let k = submission.problem;
        if (visit[k] == -1) {
          accepted.push({
            problem: k,
            submissionTime: submission.submissionTime,
            mark: submission.mark,
          });
          marks += parseInt(submission.mark);
          visit[k] = 1;
        }
      } else {
        let k = submission.problem;
        visit[k] = 1;
      }
    }

    marks = marks - 10 * (ttl - accepted.length);
    submissions[i].score = marks;
    submissions[i].accepted = accepted;
    submissions[i].penalty = 10 * (ttl - accepted.length);
    submissions[i].handle = handle;
  }
  submissions.sort((a, b) => b.score - a.score);

  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Who</th>
            <th className="text-center">Score</th>
            <th className="text-center">Solved</th>
            <th className="text-center">Penalty</th>

            {contest?.problems?.map((problem, idx) => (
              <th className="text-center">{String.fromCharCode(idx + 65)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions?.map((submission, idx) => (
            <tr>
              <th className="text-center">{idx + 1}</th>
              <td>{submission.handle}</td>
              <td className="text-center">{submission.score}</td>
              <td className="text-center">{submission.accepted.length}</td>
              <td className="text-center">{submission.penalty}</td>

              {contest?.problems?.map((problem, idx) => (
                <td className="text-[#0a0] font-semibold text-center">
                  <span className="block">+</span>
                  <span>1:30</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standing;
