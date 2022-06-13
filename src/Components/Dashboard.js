import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../firebase.init";
import useRole from "../Hooks/useRole";
const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [role, isLoading] = useRole(user?.displayName);
  if (loading || isLoading) {
    return <p>Loading...</p>;
  }
  if (user) {
    console.clear();
    console.log(role);
  }

  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-7" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* <label
          for="my-drawer-7"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-7" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-60 bg-[lightblue] text-base-content">
          <li>
            <button className="btn btn-dark text-white">
              <Link to="/dashboard">Arrange contest</Link>
            </button>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
