import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import msToTime from "./msToTime";
const Standing = ({ contests }) => {
  const { id } = useParams();
  const contest = contests?.filter((a) => a?.id == id)[0];
  const { startTime, duration } = contest;

  const {
    data: submissions,
    isLoading,
    refetch,
  } = useQuery("standing", () =>
    fetch(`https://lit-meadow-72602.herokuapp.com/submissions`, {
      method: "GET",
      headers: {
        startTime,
        duration,
        id,
      },
    }).then((res) => res.json())
  );
  let sz = submissions?.length;
  for (let i = 0; i < sz; i++) {
    const handle = submissions[i]._id.handle;
    let marks = 0;
    let accepted = [];
    let ok = 0;
    let tried = [-1, -1, -1];
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
          accepted[k] = {
            problem: k,
            submissionTime: submission.submissionTime,
            mark: submission.mark,
          };
          ok++;
          marks += parseInt(submission.mark);
          visit[k] = 1;
        }
      } else {
        let k = submission.problem;
        if (visit[k] == -1) {
          tried[k] = k;
        }
        visit[k] = 1;
      }
    }

    marks = marks - 10 * (ttl - ok);
    submissions[i].score = marks;
    if (submissions[i].score < 0) {
      submissions[i].score = 0;
    }
    submissions[i].accepted = accepted;
    submissions[i].penalty = 10 * (ttl - ok);
    submissions[i].handle = handle;
    submissions[i].tried = tried;
    submissions[i].ok = ok;
  }
  submissions?.sort((a, b) => b.score - a.score);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div class="overflow-x-auto" onMouseOver={refetch}>
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
              <td className="text-center">{submission?.score}</td>
              <td className="text-center">{submission?.ok}</td>
              <td className="text-center">{submission?.penalty}</td>

              {contest?.problems?.map((problem, i) =>
                submission?.accepted[i]?.problem == i ? (
                  <td className="text-[#0a0] font-semibold text-center">
                    <span className="block text-sm">
                      {submission?.accepted[i]?.mark}
                    </span>
                    <span>
                      {msToTime(
                        submission?.accepted[i]?.submissionTime -
                          contest?.startTime,
                        true
                      )}
                    </span>
                  </td>
                ) : submission?.tried[i] == i ? (
                  <td className="text-center font-bold text-[red] text-xl">
                    -
                  </td>
                ) : (
                  <td></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standing;
