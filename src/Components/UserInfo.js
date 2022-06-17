import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import rating from "../Images/rating.png";
import avatar from "../Images/avatar.jpg";
const UserInfo = ({ user }) => {
  return (
    <div className="border border-rounded-sm" style={{ borderRadius: "8px" }}>
      <div className="pl-3 font-semibold text-[blue] px-3 py-1">
        User information
      </div>
      <hr />
      <div className="content flex pl-3 pr-8 py-2 justify-between">
        <div className="info">
          <p className="flex">
            <img src={rating} alt="rating" height={16} width={16}></img>
            <span className="pl-1">Rating:unrated</span>
          </p>
          <ul
            style={{
              listStyle: "inside",
            }}
            className="my-[8px]"
          >
            <li className=" p-0 text-[blue] underline">
              <Link to="/settings">Settings</Link>
            </li>
            <li className=" p-0 text-[blue] underline">
              <Link to="/settings">Submissions</Link>
            </li>
            <li className=" p-0 text-[blue] underline">
              <Link to="/settings">Contests</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col align-items-center justify-center">
          <img src={avatar} alt="avatar"></img>
          <span className=" flex justify-center">{user?.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
