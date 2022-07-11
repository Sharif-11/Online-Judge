import React, { useContext } from "react";
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import useProfile from "../Hooks/useProfile";
import FindUser from "./FindUser";
import { userContext } from "./Home";
import PayAttension from "./PayAttension";
import Profile from "./Profile";
export const profileContext = createContext();
const ProfileDrawer = () => {
  const { user } = useContext(userContext);
  const [profile, loading, refetch] = useProfile(user);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <profileContext.Provider value={{ profile, refetch }}>
      <div class="drawer drawer-end drawer-mobile">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <div className="ml-5">
            <Profile />
          </div>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-4" class="drawer-overlay"></label>
          <ul class="menu p-4  overflow-y-auto w-80 bg-base-100 text-base-content">
            <PayAttension />
            <div className="my-6">
              <FindUser />
            </div>
          </ul>
        </div>
      </div>
    </profileContext.Provider>
  );
};

export default ProfileDrawer;
