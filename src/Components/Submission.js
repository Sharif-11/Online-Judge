import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Code from "./Code";
const Submission = ({ submission, flag }) => {
  const { verdict } = submission;
  let time = Infinity,
    memory = Infinity;
  // debugger;
  const testCases = submission?.result?.submissions;
  for (let i = 0; i < testCases?.length; i++) {
    time = Math.min(parseFloat(testCases[i]?.time), time);
    memory = Math.min(parseFloat(testCases[i]?.memory), memory);
  }
  // alert(time);
  if (submission?.verdict?.includes("Runtime Error"))
    submission.verdict = "Runtime Error";

  return (
    <>
      <input
        type="checkbox"
        id={`submission-${submission?._id}`}
        class="modal-toggle"
      />
      <div class="modal bg-transparent">
        <div class="modal-box p-9 max-w-[600px]">
          <label
            for={`submission-${submission?._id}`}
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Code
            sourceCode={submission?.source_code}
            language={submission?.language?.toLowerCase()}
          />
        </div>
      </div>
      <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
        <td className=" font-[500] bg-transparent text-[white]">
          <label for={`submission-${submission?._id}`}>{submission?._id}</label>
        </td>
        <td className="text-[10px] font-[500] bg-transparent text-[white]">
          {new Date(submission.submissionTime)
            .toString()
            .replace("(Bangladesh Standard Time)", "")}
        </td>

        <td className="text-[#FF00FF]  bg-transparent">
          <Link
            to={
              submission.problem < 3
                ? `/contests/${submission?.id}/problem/${String.fromCharCode(
                    submission.problem + 65
                  )}`
                : `/offline-problems/${submission.problem}`
            }
          >
            {flag == 1
              ? String.fromCharCode(submission.problem + 65) +
                `${submission?.problem < 3 ? "-" : ""}` +
                submission?.title +
                `${submission?.problem < 3 ? "" : " (offline)"}`
              : String.fromCharCode(submission.problem + 65)}
          </Link>
        </td>
        <td className="bg-transparent text-[white]">
          {submission?.language?.toUpperCase()}
        </td>
        <td
          className="text-center"
          className={
            submission.verdict == "Accepted"
              ? `font-[500] text-[#0a0] bg-transparent`
              : "font-[500] underline text-[red] bg-transparent"
          }
        >
          {submission?.verdict}
        </td>
        <td className="bg-[transparent] text-[white]">
          {time != Infinity && !isNaN(time) && `${time * 1000}ms`}
        </td>
        <td className="bg-[transparent] text-[white]">
          {memory != Infinity && !isNaN(memory) && `${memory}KB`}
        </td>
      </tr>
    </>
  );
};

export default Submission;
