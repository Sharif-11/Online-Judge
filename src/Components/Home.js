import React from "react";
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
const Home = () => {
  return (
    <div className="lg:mx-[100px]">
      <Header />
      <Routes>
        <Route path="/" element={<HomeDrawer />}>
          <Route index element={"announcement"}></Route>
          <Route path="profile/:handle" element={"profile"}></Route>
          <Route path="problemset" element={<TimeNow />}></Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<ArrangeContest />}></Route>
          <Route
            path="/dashboard/arrange-contest"
            element={<MyContest />}
          ></Route>
          <Route path="/dashboard/all-contest" element={<AllContest />}></Route>
          <Route path="/dashboard/all-user" element={<Alluser />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
