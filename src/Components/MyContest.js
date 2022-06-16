import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";
const MyContest = () => {
  const [user, loading] = useAuthState(auth);

  const { data, isLoading, refetch } = useQuery("myContest", () =>
    fetch(
      "https://lit-meadow-72602.herokuapp.com/contests/" + user?.email
    ).then((res) => res.json())
  );
  if (loading || isLoading) {
    return <p>Loading....</p>;
  }
  const handleDelete = (id) => {
    fetch(`https://lit-meadow-72602.herokuapp.com/contests/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount) {
          refetch();
        }
      });
  };
  return (
    <div className="m-4">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Contest Id</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((contest, idx) => (
              <tr>
                <th>{idx + 1}</th>
                <td>{contest?.id}</td>
                <td>{new Date(contest?.startTime).toString()}</td>

                <td>{contest?.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-dark text-white"
                    onClick={() => handleDelete(contest?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContest;
