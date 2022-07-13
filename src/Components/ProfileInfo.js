import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./Home";
import ratings from "../Images/ratings.png";
import mail from "../Images/mail.png";
import { profileContext } from "./ProfileDrawer";
import ContestChart from "./ContestChart";
const ProfileInfo = () => {
  const { user } = useContext(userContext);
  const { profile } = useContext(profileContext);
  const [rating, setRating] = useState(200);
  const { city, country, fullName, institute } = profile;
  useEffect(() => {
    fetch("https://lit-meadow-72602.herokuapp.com/ratings/" + user?.displayName)
      .then((res) => res.json())
      .then((data) => setRating(data?.rating));
  }, [user]);
  return (
    <div>
      <div className="border my-1 px-4 py-6" style={{ borderRadius: "6px" }}>
        <h1 className="font-bold text-[rgba(0,0,0,0.5)]">Newbie</h1>
        <h1 className="font-bold text-[rgba(0,0,0,0.5)] text-[24px]">
          {user?.displayName}
        </h1>
        <p className="text-[14px]">
          <span>{fullName}</span>,
          <span className="text-[blue] underline pl-[2px]">{city}</span>,
          <span className="text-[blue] underline pl-[2px]">{country}</span>
        </p>
        <p className="text-[14px]">
          <span>From</span>,
          <span className="text-[blue] underline pl-[2px]">{institute}</span>
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
      <div className="my-6 border p-5 py-8" style={{ borderRadius: "6px" }}>
        <ContestChart />
      </div>
    </div>
  );
};

export default ProfileInfo;
