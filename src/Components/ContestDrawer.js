import React from "react";
import Contest from "./Contest";
import ContestInfo from "./ContestInfo";
import Marks from "./Marks";
import { timeContext } from "./Home";
const ContestDrawer = () => {
  return (
    <div class="drawer drawer-mobile drawer-end">
      <input id="my-drawer-contest" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Contest />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-contest" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-68 bg-base-100 text-base-content">
          <ContestInfo />

          <Marks />
        </ul>
      </div>
    </div>
  );
};

export default ContestDrawer;
