import React, { useEffect, useState } from "react";

const useProfile = (user) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const refetch = () => {
    fetch(`https://lit-meadow-72602.herokuapp.com/profile/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  useEffect(() => {
    refetch();
  }, [user]);
  return [profile, loading, refetch];
};

export default useProfile;
