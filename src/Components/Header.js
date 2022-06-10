import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
const Header = () => {
  return (
    <div>
      <div className="flex justify-between align-items-center p-3">
        <div className="img-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="btn-container flex align-items-center mt-6">
          <Link to="/login" className="mx-3 underline text-[blue]">
            Enter
          </Link>

          <Link to="/register" className="underline text-[blue]">
            Register
          </Link>
        </div>
      </div>
      <div className="flex border px-6 py-3 rounded-xl">
        <Link to="/" className="mx-1">
          HOME
        </Link>
        <Link to="/top" className="mx-1">
          TOP
        </Link>
        <Link to="/problems" className="mx-1">
          PROBLEMSET
        </Link>
        <Link to="/admin" className="mx-1">
          DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default Header;
