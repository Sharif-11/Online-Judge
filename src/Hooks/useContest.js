import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useContest = (id) => {
  const [contest, setContest] = useState({});
  const [loading, setLoading] = useState(true);
  const refetch = () => {
    fetch(
      `https://lit-meadow-72602.herokuapp.com/contests?status=published&id=${parseInt(
        id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setContest(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    refetch();
  }, [id]);
  return [contest, loading, refetch];
};

export default useContest;
