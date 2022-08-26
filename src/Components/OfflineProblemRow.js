import React from "react";
import { Link } from "react-router-dom";

const OfflineProblemRow = ({ id, title, rating }) => {
  const url = `/offline-problems/` + id;
  console.log(url);
  return (
    <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
      <td className="bg-transparent text-white font-semibold text-[orange] text-center">
        <Link to={url}> {id}</Link>
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

export default OfflineProblemRow;
