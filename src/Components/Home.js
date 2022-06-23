import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import HomeDrawer from "./HomeDrawer";
import Login from "./Login";
import Register from "./Register";
import ArrangeContest from "./ArrangeContest";
import TimeNow from "./TimeNow";
import MyContest from "./MyContest";
import AllContest from "./AllContest";
import Alluser from "./Alluser";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";
import Announcements from "./Announcements";
import Contest from "./Contest";
import Problem from "./MonacoEditor";
import Problems from "./Problems";
import Question from "./Question";
import RequireProblemsetter from "./RequireProblemsetter";
import Submit from "./Submit";
import MySubmission from "./MySubmission";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import ContestDrawer from "./ContestDrawer";
import ContestsRoute from "./ContestsRoute";
import axios from "axios";
import Standing from "./Standing";

const Home = () => {
  const [contests, setContests] = useState([]);
  const reload = () => {
    axios
      .get("https://lit-meadow-72602.herokuapp.com/contests?status=published")
      .then(({ data }) => {
        setContests(data);
      });
  };
  useEffect(() => {
    axios
      .get("https://lit-meadow-72602.herokuapp.com/contests?status=published")
      .then(({ data }) => {
        setContests(data);
      });
  }, []);
  return (
    <div className="lg:mx-[100px]">
      <Header />
      <Routes>
        <Route path="/" element={<HomeDrawer contests={contests} />}>
          <Route index element={<Announcements contests={contests} />}></Route>
          <Route path="profile/:handle" element={"profile"}></Route>
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
            path="/dashboard/arrange-contest"
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
      </Routes>
    </div>
  );
};

export default Home;
