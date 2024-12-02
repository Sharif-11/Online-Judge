import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Chart } from "react-google-charts";
import { useQuery } from "react-query";
import auth from "../firebase.init";

export const options = {
  legend: {
    textStyle: { color: "white" },
  },
  is3D: true,
  colors: [
    "#0a0",
    "red",
    "rgb(3, 169, 244)",
    "rgb(156, 39, 176)",
    "rgb(255, 152, 0)",
    "rgb(158, 158, 158)",
  ],
  backgroundColor: "#3d4451",
};

export default function SubmissionPiechart() {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState([]);
  const { data: submissions, isLoading } = useQuery("all-submissions", () =>
    fetch(
      `https://cse-326-project-server.vercel.app/submissions/${user?.displayName}`
    ).then((res) => res.json())
  );
  useEffect(() => {
    let sz = submissions?.length;
    const obj = [
      ["Verdict", "Frequency"],
      ["Accepted", 0],
      ["Wrong Answer", 0],
      ["Time Limit Exceeded", 0],
      ["Runtime error", 0],
      ["Compilation error", 0],
      ["Others", 0],
    ];
    for (let i = 0; i < sz; i++) {
      if (submissions[i]?.verdict?.includes("Runtime Error"))
        submissions[i].verdict = "Runtime Error";
      const { verdict } = submissions[i];
      if (verdict == "Accepted") {
        obj[1][1]++;
      } else if (verdict == "Runtime Error") {
        obj[4][1]++;
      } else if (verdict == "Time Limit Exceeded") {
        obj[3][1]++;
      } else if (verdict == "Compilation Error") {
        obj[5][1]++;
      } else if (verdict.includes("test")) {
        obj[2][1]++;
      } else {
        obj[6][1]++;
      }
      // console.log(verdict);
    }

    setData(obj);
  }, [submissions]);
  if (isLoading || loading) {
    return <p>Loading...</p>;
  }

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"750px"}
      height={"250px"}
    />
  );
}
