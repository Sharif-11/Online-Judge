import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { userContext } from "./Home";
const RatedContests = () => {
  const { user } = useContext(userContext);
  const { data, isLoading } = useQuery("ratedContest", () =>
    fetch(
      `https://lit-meadow-72602.herokuapp.com/profile/contests/${user?.displayName}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  for (let i = 0; i < data?.length; i++) {
    let sz = data[i]?.newRating?.length;
    for (let j = 0; j < sz; j++) {
      if (data[i]?.newRating[j]?.username == user?.displayName) {
        const { newRating, previousRating, position } = data[i]?.newRating[j];
        data[i].newRating = newRating;
        data[i].previousRating = previousRating;
        data[i].ratingChange = newRating - previousRating;
        data[i].rank = position;
      }
      if (data[i]?.standing[j]?.handle == user?.displayName) {
        data[i].solved = data[i].standing[j].ok;
      }
    }
  }
  // console.log(data);
  return (
    <div>
      <h1 className="text-lg my-4 font-bold text-center">Contests</h1>
      <div class="overflow-x-auto">
        <table class="table table-compact w-full">
          <thead>
            <tr className="bg-[#3d4451]">
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                #
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                Contest
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                Start time
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                Rank
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                Solved
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                Rating Change
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]">
                New Rating
              </th>
              <th className="text-sm capitalize text-center bg-transparent text-[white]"></th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {data?.map((contest, idx) => (
              <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
                <th className="text-center bg-transparent text-[white]">
                  {data?.length - idx}
                </th>
                <td className="text-[blue]  text-center bg-transparent ">
                  <Link
                    to={`/contests/${contest?.identity}`}
                  >{`Coding Battle Round #${contest?.identity}`}</Link>
                </td>
                <td className="text-[12px] text-center text-white bg-transparent">
                  {new Date(contest?.startTime)
                    .toString()
                    .replace(" (Bangladesh Standard Time)", "")}
                </td>
                <td className="text-center bg-transparent text-white">
                  {contest?.rank}
                </td>
                <td className="text-center text-[blue] underline text-sm bg-transparent text-white">
                  <Link to={`/contests/${contest?.identity}/my`}>
                    {contest?.solved}
                  </Link>
                </td>
                <td
                  className={`text-center text-[red] font-[500] bg-transparent ${
                    contest?.ratingChange > 0 && "text-[#0a0] font-semibold"
                  } ${contest?.ratingChange == 0 && "text-[black] font-[400]"}`}
                >
                  {contest?.ratingChange > 0
                    ? `+${contest?.ratingChange}`
                    : `${contest?.ratingChange}`}
                </td>
                <td className="text-center bg-transparent text-[white]">
                  {contest?.newRating}
                </td>
                <td className="text-center bg-transparent text-[white]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatedContests;
