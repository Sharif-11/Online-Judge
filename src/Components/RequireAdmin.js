import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";

const RequireAdmin = ({ children }) => {
  let [user, loading, error] = useAuthState(auth);
  let [role, rLoading] = useRole(user);
  let location = useLocation();
  if (loading || rLoading) {
    return <p>Loading...</p>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
