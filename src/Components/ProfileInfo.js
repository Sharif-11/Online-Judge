import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./Home";
import ratings from "../Images/ratings.png";
import mail from "../Images/mail.png";
const ProfileInfo = () => {
  const { user } = useContext(userContext);
  const [rating, setRating] = useState(200);
  useEffect(() => {
    fetch("http://localhost:5000/ratings/" + user?.displayName)
      .then((res) => res.json())
      .then((data) => setRating(data?.rating));
  }, [user]);
  return (
    <div className="border my-1 px-4 py-6" style={{ borderRadius: "6px" }}>
      <h1 className="font-bold text-[rgba(0,0,0,0.5)]">Newbie</h1>
      <h1 className="font-bold text-[rgba(0,0,0,0.5)] text-[24px]">
        {user?.displayName}
      </h1>
      <p className="text-[14px]">
        <span>{user?.displayName}</span>,
        <span className="text-[blue] underline pl-[2px]">Chittagong</span>,
        <span className="text-[blue] underline pl-[2px]">Bangladesh</span>
      </p>
      <p className="text-[14px]">
        <span>From</span>,
        <span className="text-[blue] underline pl-[2px]">
          Chittagong University Of Engineering & Technology
        </span>
        ,
      </p>
      <div className="flex my-3">
        <img src={ratings} alt="rating"></img>

        <span className="pl-2 font-semibold text-[18px]">
          Contest Rating: {rating}
        </span>
      </div>
      <div className="flex">
        <img src={mail} alt="mail"></img>

        <span className="pl-2 font-semibold text-[18px]">{user?.email}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
