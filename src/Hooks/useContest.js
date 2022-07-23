import { useEffect, useState } from "react";

const useContest = (id) => {
  const [contest, setContest] = useState({});
  const [loading, setLoading] = useState(true);
  const refetch = () => {
    fetch(`http://localhost:5000/contests/${parseInt(id)}`)
      .then((res) => res.json())
      .then((data) => {
        setContest(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    refetch();
  }, [id]);

  return [contest, loading];
};

export default useContest;
