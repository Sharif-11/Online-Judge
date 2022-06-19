import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { signOut } from "firebase/auth";
const RequireProblemsetter = ({ children }) => {
  let [user, loading, error] = useAuthState(auth);
  let [role, rLoading] = useRole(user);
  let location = useLocation();
  if (loading || rLoading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role == "user") {
    return (
      <h1 className="text-center font-bold">
        403 <br />
        Unauthorized access
      </h1>
    );
  }

  return children;
};

export default RequireProblemsetter;
