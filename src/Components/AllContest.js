import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "react-query";
const AllContest = ({ reload }) => {
  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("allContest", () =>
    fetch("https://lit-meadow-72602.herokuapp.com/contests").then((res) =>
      res.json()
    )
  );
  const handleStatus = (id, status) => {
    fetch("https://lit-meadow-72602.herokuapp.com/contests/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: status + "ed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        reload();
      });
  };
  const handleAction = (id, action) => {
    if (action == "delete") {
    } else {
      const confirm = window.confirm("Do you want to publish this contest?");
      if (!confirm) {
        return;
      }
      handleStatus(id, action);
    }
  };
  return (
    <div>
      <div class="overflow-x-auto m-4">
        <table class="table  w-full">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Email</th>
              <th>Start Time</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((contest, idx) => (
              <tr>
                <th>{idx + 1}</th>
                <td>{contest?.id}</td>
                <td>{contest?.email}</td>
                <td>
                  {new Date(contest?.startTime)
                    .toString()
                    .replace("(Bangladesh Standard Time)", "")}
                </td>
                <td>{contest?.status}</td>
                {contest?.status == "pending" && (
                  <td className="flex justify-between">
                    {/* {contest?.status === "pending" && (
                      <button className="btn btn-xs">Preview</button>
                    )} */}
                    <button
                      className="btn btn-xs"
                      onClick={() => handleAction(contest?._id, "publish")}
                    >
                      Publish
                    </button>
                    {contest?.status === "pending" && (
                      <button className="btn btn-xs">Discard</button>
                    )}{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContest;
