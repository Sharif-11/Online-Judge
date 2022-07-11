import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "./Home";
const Profile = () => {
  const { user } = useContext(userContext);
  const [active, setActive] = useState("handle");

  return (
    <div className="profile">
      <div class="tabs tabs-boxed bg-transparent">
        <Link to={`/profile`} onClick={() => setActive("handle")}>
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "handle" && "tab-active"
            }`}
          >
            {user?.displayName}
          </a>
        </Link>

        <Link to={`/profile/settings`} onClick={() => setActive("settings")}>
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "settings" && "tab-active"
            }`}
          >
            Settings
          </a>
        </Link>
        <Link to={`/profile/social`} onClick={() => setActive("social")}>
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "social" && "tab-active"
            }`}
          >
            Social
          </a>
        </Link>
        <Link
          to={`/profile/submissions`}
          onClick={() => setActive("submissions")}
        >
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "submissions" && "tab-active"
            }`}
          >
            Submissions
          </a>
        </Link>
        <Link to={`/profile/contests`} onClick={() => setActive("contests")}>
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "contests" && "tab-active"
            }`}
          >
            Contests
          </a>
        </Link>
        <Link
          to={`/profile/problemsettings`}
          onClick={() => setActive("problemsettings")}
        >
          <a
            class={`tab font-bold text-[black] text-xs uppercase ${
              active == "problemsettings" && "tab-active"
            }`}
          >
            problemsettings
          </a>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
