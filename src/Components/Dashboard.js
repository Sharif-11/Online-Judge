import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "./Home";
const Dashboard = () => {
  const { role } = useContext(userContext);

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
              <li className="flex flex-col p-0">
                <Link to="/dashboard" className=" p-0">
                  <button className="btn btn-dark text-white w-full">
                    Arrange contest
                  </button>
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/dashboard/add-problem" className="p-0">
                  <button className="btn btn-dark text-white w-full">
                    Add Problem
                  </button>
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/dashboard/my-problems" className="p-0">
                  <button className="btn btn-dark text-white w-full">
                    My Problems
                  </button>
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/dashboard/my-contest" className="p-0">
                  <button className="btn btn-dark text-white w-full">
                    My contests
                  </button>
                </Link>
              </li>
            </>
          )}
          {role == "admin" && (
            <li className="mt-2">
              <Link to="/dashboard/all-problem" className="p-0">
                <button className="btn btn-dark text-white w-full">
                  All Problem
                </button>
              </Link>
            </li>
          )}
          {role == "admin" && (
            <li className="mt-2">
              <Link to="/dashboard/all-contest" className="p-0">
                <button className="btn btn-dark text-white w-full">
                  All Contest
                </button>
              </Link>
            </li>
          )}
          {role == "admin" && (
            <li className="mt-2">
              <Link to="/dashboard/all-user" className="p-0">
                <button className="btn btn-dark text-white w-full">
                  All User
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
