import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  return (
    <div className="lg:mx-[100px]">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="*"
          element={<h2 className="text-4xl font-bold">Welcome to home page</h2>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
