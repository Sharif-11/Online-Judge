import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./Home";
import ratings from "../Images/ratings.png";
import mail from "../Images/mail.png";
import { profileContext } from "./ProfileDrawer";
import ContestChart from "./ContestChart";
import { useQuery } from "react-query";
import SubmissionPiechart from "./SubmissionPiechart";
const ProfileInfo = () => {
  const [rank, setRank] = useState("unrated");
  const [color, setColor] = useState("rgba(0,0,0,0.5)");
  const { user } = useContext(userContext);
  const { profile, refetch } = useContext(profileContext);
  const { city, country, fullName, institute } = profile;
  const { data, isLoading } = useQuery("my-rating", () =>
    fetch("http://localhost:5000/ratings/" + user?.displayName).then((res) =>
      res.json()
    )
  );
  useEffect(() => {
    if (!data?.rating) {
      setRank("unrated");
      setColor("black");
    } else if (data?.rating < 1200) {
      setRank("Newbie");
    } else if (data?.rating < 1400) {
      setRank("Pupil");
      setColor("#0a0");
    } else if (data?.rating < 1600) {
      setRank("Specialist");
      setColor("cyan");
    } else if (data?.rating < 1900) {
      setRank("Expert");
      setColor("blue");
    } else {
      setRank("Legend");
      setColor("violet");
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mb-4" onMouseOver={() => refetch()}>
      <div
        className="border-2 my-1 px-4 py-6 mr-2 shadow-lg"
        style={{ borderRadius: "6px" }}
      >
        <h1 className={`font-bold text-[${color}]`}>{rank}</h1>
        <h1 className={`font-bold text-[${color}] text-[24px]`}>
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
            Contest Rating: {data?.rating || "unrated"}
          </span>
        </div>
        <div className="flex">
          <img src={mail} alt="mail"></img>

          <span className="pl-2 font-semibold text-[18px]">{user?.email}</span>
        </div>
      </div>
      <div
        className="my-6 border-2 p-5 py-8 shadow-lg mr-2 "
        style={{ borderRadius: "6px" }}
      >
        <ContestChart />
      </div>
      <div
        className="my-6 border-2 p-5 py-8 shadow-lg mr-2 "
        style={{ borderRadius: "6px" }}
      >
        <SubmissionPiechart />
      </div>
    </div>
  );
};

export default ProfileInfo;
