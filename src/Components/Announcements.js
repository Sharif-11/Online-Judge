import axios from "axios";
import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";

const Announcements = () => {
  const [contests, setContests] = useState([]);
  useEffect(() => {
    axios
      .get(" https://lit-meadow-72602.herokuapp.com/contests?status=published")
      .then(({ data }) => {
        setContests(data);
      });
  }, []);
  return (
    <div>
      {contests.map((contest) => (
        <Announcement {...contest}></Announcement>
      ))}
    </div>
  );
};

export default Announcements;
