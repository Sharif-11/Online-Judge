import React, { useEffect, useState } from "react";

const useProfile = (user) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/profile/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [user]);
  return [profile, loading];
};

export default useProfile;
