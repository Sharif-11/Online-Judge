import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContest from "../Hooks/useContest";
import { timeContext } from "./Home";
import msToTime from "./msToTime";

const ContestInfo = () => {
  const { id } = useParams();
  const [contest, loading, refetch] = useContest(id);
  const { time } = useContext(timeContext);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div class="card w-72 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="font-bold flex justify-center text-md text-[blue]">
          Contest is
          {time >= contest?.duration + contest?.startTime
            ? " ended"
            : " running"}
        </h2>
        <p className="text-center text-[blue] font-semibold underline">
          Contest Battle Round #{contest?.id}
        </p>
        {time >= contest?.duration + contest?.startTime || (
          <p className="text-center text-[blue] font-bold text-lg">
            {msToTime(contest.startTime + contest.duration - time)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContestInfo;
