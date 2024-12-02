import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import auth from "../firebase.init";

const ContestChart = () => {
  const [user, loading] = useAuthState(auth);

  let { data, isLoading } = useQuery("ratedContest", () =>
    fetch(
      `https://cse-326-project-server.vercel.app/profile/contests/${user?.displayName}`
    ).then((res) => res.json())
  );
  if (isLoading || loading) {
    return <p>Loading...</p>;
  }
  for (let i = 0; i < data?.length; i++) {
    let sz = data[i]?.newRating?.length;
    for (let j = 0; j < sz; j++) {
      if (data[i]?.newRating[j]?.username == user?.displayName) {
        const { newRating } = data[i]?.newRating[j];
        data[i].newRating = newRating;
      }
    }
  }
  let sz = data.length;
  let arr = [];
  for (let i = sz - 1; i >= 0; i--) {
    arr.push({
      name: data[i]?.id,
      rating: data[i].newRating,
    });
  }
  data = arr;
  return (
    <div className="bg-[#3d4451]">
      <AreaChart
        width={750}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        {/* <Tooltip /> */}

        <Area
          type="monotone"
          dataKey="rating"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export default ContestChart;
