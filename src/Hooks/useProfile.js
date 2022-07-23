import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useProfile = (user) => {
  // const [profile, setProfile] = useState({});
  // const [loading, setLoading] = useState(true);
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery(["profile", user?.email], () =>
    fetch(`http://localhost:5000/profile/${user?.email}`).then((res) =>
      res.json()
    )
  );
  // const refetch = () => {
  // fetch(`http://localhost:5000/profile/${user?.email}`)
  //   .then((res) => res.json())
  //     .then((data) => {
  //       setProfile(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => setLoading(false));
  // };
  // useEffect(() => {
  //   refetch();
  // }, [user]);
  return [profile, isLoading, refetch];
};

export default useProfile;
