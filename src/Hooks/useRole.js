import React, { useEffect, useState } from "react";

const useRole = (handle) => {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.role == "admin" || data?.role == "problemSetter") {
          setRole(data?.role);
          setLoading(false);
        }
      });
  }, [handle]);
  return [role, loading];
};

export default useRole;
