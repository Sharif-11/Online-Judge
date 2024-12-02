import { useEffect, useState } from "react";

const useRole = (user) => {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://cse-326-project-server.vercel.app/users/${user?.displayName}`
    )
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
