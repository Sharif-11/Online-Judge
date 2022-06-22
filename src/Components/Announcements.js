import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";

const Announcements = ({ contests }) => {
  return (
    <div>
      {contests.map((contest) => (
        <Announcement {...contest}></Announcement>
      ))}
    </div>
  );
};

export default Announcements;
