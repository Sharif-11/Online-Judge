import React, { useEffect, useState } from "react";

const useRole = (user) => {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://lit-meadow-72602.herokuapp.com/users/${user?.displayName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.role == "admin" || data?.role == "problemSetter") {
          setRole(data?.role);
          setLoading(false);
        } else {
          setRole("user");
          setLoading(false);
        }
      })
      .catch((err) => setLoading(false));
  }, [user]);

  return [role, loading];
};

export default useRole;
