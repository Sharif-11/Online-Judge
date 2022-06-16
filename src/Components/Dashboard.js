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
    <div class="drawer drawer-mobile my-3">
      <input id="my-drawer-7" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ">
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-7" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-60 bg-[lightblue] text-base-content">
          {(role == "admin" || role == "problemSetter") && (
            <>
              <li>
                <button className="btn btn-dark text-white">
                  <Link to="/dashboard">Arrange contest</Link>
                </button>
              </li>
              <li className="mt-2">
                <button className="btn btn-dark text-white">
                  <Link to="/dashboard/arrange-contest">My contest</Link>
                </button>
              </li>
            </>
          )}
          {role == "admin" && (
            <li className="mt-2">
              <button className="btn btn-dark text-white">
                <Link to="/dashboard/all-contest">All Contest</Link>
              </button>
            </li>
          )}
          {role == "admin" && (
            <li className="mt-2">
              <button className="btn btn-dark text-white">
                <Link to="/dashboard/all-user">All User</Link>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
