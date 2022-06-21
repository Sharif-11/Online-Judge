import React from "react";

const Submission = ({ submission }) => {
  let time = Infinity,
    memory = Infinity;
  const testCases = submission?.result?.submissions;
  for (let i = 0; i < testCases?.length; i++) {
    time = Math.min(parseFloat(testCases[i].time), time);
    memory = Math.min(parseFloat(testCases[i].memory), memory);
  }
  return (
    <tr>
      <th>{submission._id}</th>
      <td className="text-xs">
        {new Date(submission.submissionTime)
          .toString()
          .replace("(Bangladesh Standard Time)", "")}
      </td>
      <td>{submission?.handle}</td>
      <td>{String.fromCharCode(submission.problem + 65)}</td>
      <td>{submission?.language?.toUpperCase()}</td>
      <td>{submission?.verdict}</td>
      <td>{time}s</td>
      <td>{memory}KB</td>
    </tr>
  );
};

export default Submission;
