import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import auth from "../firebase.init";
import FindUser from "./FindUser";
import PayAttension from "./PayAttension";
import UserInfo from "./UserInfo";

const HomeDrawer = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div class="drawer drawer-end drawer-mobile my-[24px]">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ml-3">
        {/* <label
          for="my-drawer-4"
          class="drawer-button btn btn-primary lg:hidden"
        >
          Open drawer
        </label> */}
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-4" class="drawer-overlay"></label>
        <ul class="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li className="my-5">
            <PayAttension />
          </li>

          <li className="my-5">
            <FindUser />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeDrawer;
