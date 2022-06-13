import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import logo from "../Images/logo.png";
import { signOut } from "firebase/auth";
import download from "../Images/download.png";
import final_logo from "../Images/final_logo.png";
const Header = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between align-items-center p-3">
        <div className="img-container flex align-items-center">
          <img src={final_logo} alt="logo" height={90} width={90}></img>
          <h1 className="text-3xl font-bold   my-4">
            Coding
            <br /> Playground
          </h1>
        </div>
        <div className="btn-container flex align-items-center mt-6">
          {user ? (
            <Link
              to={`/profile/${user?.displayName}`}
              className="mx-3 underline text-[blue]"
            >
              {user?.displayName}
            </Link>
          ) : (
            <Link to="/login" className="mx-3 underline text-[blue]">
              Login
            </Link>
          )}

          {user ? (
            <Link
              to="/register"
              className="underline text-[blue] mx-2"
              onClick={() => signOut(auth)}
            >
              Logout
            </Link>
          ) : (
            <Link to="/register" className="underline text-[blue]">
              Register
            </Link>
          )}
        </div>
      </div>
      <div className="flex border px-6 py-3 rounded-xl">
        <Link to="/" className="mx-1">
          HOME
        </Link>

        <Link to="/problemset" className="mx-1">
          PROBLEMSET
        </Link>
        <Link to="/dashboard" className="mx-1">
          DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default Header;
