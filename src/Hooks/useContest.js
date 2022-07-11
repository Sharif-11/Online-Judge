import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const useContest = (id) => {
  // const [contest, setContest] = useState({});
  // const [loading, setLoading] = useState(true);
  // const refetch = () => {
  // fetch(`http://localhost:5000/contests/${parseInt(id)}`)
  //   .then((res) => res.json())
  //     .then((data) => {
  //       setContest(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   refetch();
  // }, [id]);
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["contest-id", id],
    () => {
      return fetch(`http://localhost:5000/contests/${parseInt(id)}`).then(
        (res) => res.json()
      );
    }
  );
  console.log(data);
  return [data, isLoading, refetch, error];
};

export default useContest;
