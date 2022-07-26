import React, { useContext } from "react";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import final_logo from "../Images/final_logo.png";
import Ellipsis from "../Images/Ellipsis.svg";
import { userContext } from "./Home";

const Header = () => {
  const { user, role } = useContext(userContext);

  return (
    <div className="flex flex-col-reverse lg:flex-col">
      <div className="flex justify-between align-items-center pb-0 lg:py-3 ">
        <div className="img-container align-items-center flex ml-2 lg:ml-0">
          <img
            src={final_logo}
            alt="logo"
            height={90}
            width={90}
            className="max-w-[16vw] max-h-[16vw] "
          ></img>
          <h1 className="text-xs lg:text-2xl font-bold  flex flex-col justify-center ">
            <span>Coding</span>
            <span>BattleGround</span>
          </h1>
        </div>
        <div className="btn-container flex align-items-center mt-3 mr-4 lg:mr-0 lg:mt-6">
          {!!user && (
            <Link to={`/profile`} className="mx-3 btn btn-xs text-[white]">
              {user?.displayName}
            </Link>
          )}
          {!user && (
            <Link to="/login" className="mx-3 btn btn-xs text-[white]">
              Login
            </Link>
          )}
          {!!user && (
            <Link
              to="/register"
              className=" text-[white] btn btn-xs mx-2"
              onClick={() => signOut(auth)}
            >
              Logout
            </Link>
          )}
          {!user && (
            <Link to="/register" className=" btn btn-xs text-[white]">
              Register
            </Link>
          )}
        </div>
      </div>
      <div class="navbar  py-0">
        <div class="navbar-start w-[100%]">
          <div class="dropdown  w-[100%]">
            <div className="flex align-items-center justify-between  w-[100%]">
              <label tabindex="0" class=" btn btn-ghost  btn-sm lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <label
                for="my-drawer-7"
                class=" drawer-button  btn-sm  flex align-items-center lg:hidden mr-4"
              >
                <img src={Ellipsis} height={6} width={6}></img>
              </label>
            </div>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content  mt-3 p-2 shadow  rounded-box w-52"
            >
              <li>
                <Link to="/" className="mx-1">
                  HOME
                </Link>
              </li>

              <li>
                <Link to="/problemset" className="mx-1">
                  PROBLEMSET
                </Link>
              </li>
              <li>
                <Link to="/contests" className="mx-1">
                  CONTESTS
                </Link>
              </li>

              {(role == "admin" || role == "problemSetter") && (
                <li>
                  <Link to="/dashboard" className="mx-1">
                    DASHBOARD
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div class="navbar-center hidden lg:flex w-[100%]">
          <ul
            class="menu menu-horizontal w-[100%] p-0  justify-start bg-[#3D4451] text-white"
            style={{ borderRadius: "16px" }}
          >
            <li>
              <Link
                to="/"
                className="mx-1  active:bg-[transparent] active:text-[white]"
              >
                HOME
              </Link>
            </li>

            <li>
              <Link
                to="/problemset"
                className="mx-1 active:bg-[transparent] active:text-[white]"
              >
                PROBLEMSET
              </Link>
            </li>
            <li>
              <Link
                to="/contests"
                className="mx-1 active:bg-[transparent] active:text-[white]"
              >
                CONTESTS
              </Link>
            </li>
            {(role == "admin" || role == "problemSetter") && (
              <li>
                <Link
                  to="/dashboard"
                  className="mx-1 active:bg-[transparent] active:text-[white]"
                >
                  DASHBOARD
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
