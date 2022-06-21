import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Contest from "./Contest";
import useContest from "../Hooks/useContest";
import ContestInfo from "./ContestInfo";
import Marks from "./Marks";
const ContestDrawer = () => {
  const { id } = useParams();
  const [contest, loading, refetch] = useContest(id);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div class="drawer drawer-mobile drawer-end">
      <input id="my-drawer-contest" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* <label for="my-drawer-contest" class="drawer-button btn btn-primary">
          Open drawer
        </label> */}
        <Contest />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-contest" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-68 bg-base-100 text-base-content">
          <ContestInfo contest={contest} refetch={refetch} />
          {contest?.startTime + contest?.duration <= new Date().getTime() || (
            <Marks contest={contest} refetch={refetch} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContestDrawer;
