import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

const RequireTime = ({ children, contests }) => {
  let location = useLocation();
  const { id } = useParams();

  const time = new Date().getTime();
  const contest = contests?.filter((a) => a.id == id)[0];
  if (contest?.startTime <= time) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireTime;
