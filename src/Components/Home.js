import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import HomeDrawer from "./HomeDrawer";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  return (
    <div className="lg:mx-[100px]">
      <Header />
      <Routes>
        <Route path="/" element={<HomeDrawer />}>
          <Route index element={"announcement"}></Route>
          <Route path="profile/:handle" element={"profile"}></Route>
          <Route path="problemset" element={"problemset"}></Route>
          <Route path="admin" element={"dashboard"}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
