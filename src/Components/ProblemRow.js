import React from "react";
import { Link } from "react-router-dom";

const ProblemRow = ({ id, title, rating }) => {
  const contest = id?.split("-")[0];
  const problem = id?.split("-")[1];
  const url = `/contests/${contest}/problem/${problem}`;
  console.log(url);
  return (
    <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
      <td className="bg-transparent text-white font-semibold text-[orange] text-center">
        <Link to={url}> {id.replace("-", "")}</Link>
      </td>
      <td className="bg-transparent text-white text-center">
        <Link to={url}>{title}</Link>
      </td>
      <td className="bg-transparent text-[lightblue] text-center">
        {rating || "800"}
      </td>
    </tr>
  );
};

export default ProblemRow;
