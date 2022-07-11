import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import HomeDrawer from "./HomeDrawer";
import Login from "./Login";
import Register from "./Register";
import ArrangeContest from "./ArrangeContest";
import MyContest from "./MyContest";
import AllContest from "./AllContest";
import Alluser from "./Alluser";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";
import Announcements from "./Announcements";
import Problems from "./Problems";
import Question from "./Question";
import RequireProblemsetter from "./RequireProblemsetter";
import Submit from "./Submit";
import MySubmission from "./MySubmission";
import ContestDrawer from "./ContestDrawer";
import ContestsRoute from "./ContestsRoute";
import axios from "axios";
import Standing from "./Standing";
import Profile from "./Profile";
import { createContext } from "react";
import ProblemSetting from "./ProblemSetting";
import ProfileDrawer from "./ProfileDrawer";
import ProfileInfo from "./ProfileInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useRole from "../Hooks/useRole";
import Social from "./Social";
import Settings from "./Settings";
export const timeContext = createContext(null);
export const userContext = createContext(null);
const Home = () => {
  const [contests, setContests] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [time, setTime] = useState(new Date().getTime());
  const [role, rLoading] = useRole(user);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const reload = () => {
    axios
      .get("https://lit-meadow-72602.herokuapp.com/contests")
      .then(({ data }) => {
        setContests(data);
      });
  };

  useEffect(() => {
    axios
      .get("https://lit-meadow-72602.herokuapp.com/contests")
      .then(({ data }) => {
        setContests(data);
      });
  }, []);
  if (loading || rLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="lg:mx-[100px]" onMouseOver={reload}>
      <userContext.Provider value={{ user, role }}>
        <timeContext.Provider value={{ time, setTime }}>
          <Header />
          <Routes>
            <Route path="/" element={<HomeDrawer contests={contests} />}>
              <Route
                index
                element={<Announcements contests={contests} />}
              ></Route>
              <Route path="profile/:handle" element={<Profile />}></Route>
              <Route path="problemset" element={"problemset"}></Route>
              <Route
                path="contests"
                element={<ContestsRoute contests={contests} reload={reload} />}
              ></Route>
            </Route>
            <Route
              path="dashboard"
              element={
                <RequireProblemsetter>
                  <Dashboard />
                </RequireProblemsetter>
              }
            >
              <Route
                index
                element={
                  <RequireProblemsetter>
                    <ArrangeContest />
                  </RequireProblemsetter>
                }
              ></Route>
              <Route
                path="/dashboard/my-contest"
                element={
                  <RequireProblemsetter>
                    <MyContest reload={reload} />
                  </RequireProblemsetter>
                }
              ></Route>
              <Route
                path="/dashboard/all-contest"
                element={
                  <RequireAdmin>
                    <AllContest reload={reload} />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                path="/dashboard/all-user"
                element={
                  <RequireAdmin>
                    <Alluser />
                  </RequireAdmin>
                }
              ></Route>
            </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/contests/:id"
              element={
                <RequireAuth>
                  <ContestDrawer />
                </RequireAuth>
              }
            >
              <Route index element={<Problems contests={contests} />}></Route>
              <Route
                path="/contests/:id/problem/:ch"
                element={<Question contests={contests} />}
              ></Route>
              <Route
                path="/contests/:id/submit"
                element={<Submit contests={contests} />}
              ></Route>
              <Route path="/contests/:id/my" element={<MySubmission />}></Route>
              <Route
                path="/contests/:id/standing"
                element={<Standing contests={contests} />}
              ></Route>
            </Route>
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfileDrawer />
                </RequireAuth>
              }
            >
              <Route index element={<ProfileInfo />}></Route>
              <Route path="/profile/settings" element={<Settings />}></Route>
              <Route path="/profile/social" element={<Social />}></Route>
              <Route
                path="/profile/submissions"
                element={"submissions"}
              ></Route>
              <Route path="/profile/contests" element={"contests"}></Route>
              <Route
                path="/profile/problemsettings"
                element={<ProblemSetting />}
              ></Route>
            </Route>
          </Routes>
        </timeContext.Provider>
      </userContext.Provider>
    </div>
  );
};

export default Home;
