import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";
import Preview from "./Preview";
const MyContest = ({ reload }) => {
  const [user, loading] = useAuthState(auth);

  const { data, isLoading, refetch } = useQuery("myContest", () =>
    fetch(
      "https://lit-meadow-72602.herokuapp.com/contests/" + user?.email
    ).then((res) => res.json())
  );
  if (loading || isLoading) {
    return <p>Loading....</p>;
  }
  const handleRequest = (id) => {
    fetch(`https://lit-meadow-72602.herokuapp.com/contests/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "requested" }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };
  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this contest?");
    if (!confirm) {
      return;
    }
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
          reload();
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
              <>
                <tr>
                  <th>{idx + 1}</th>
                  <td>{contest?.id}</td>
                  <td>
                    {new Date(contest?.startTime)
                      .toString()
                      .replace("(Bangladesh Standard Time)", "")}
                  </td>

                  <td>{contest?.status}</td>
                  <td>
                    {contest?.status == "published" ? (
                      <button
                        className="btn btn-sm btn-dark text-white"
                        onClick={() => handleDelete(contest?._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <>
                        <label
                          for={`preview-${contest?.id}`}
                          class="btn modal-button btn-xs"
                        >
                          preview
                        </label>

                        {(contest?.status == "discarded" ||
                          contest?.status == "pending") && (
                          <button className="btn btn-xs text-xs btn-dark mx-1 text-white">
                            edit
                          </button>
                        )}

                        {(contest?.status == "pending" ||
                          contest?.status == "discarded") && (
                          <button
                            className="btn btn-xs my-2  btn-dark text-white"
                            onClick={() => handleRequest(contest?._id)}
                          >
                            Request to publish
                          </button>
                        )}
                        <button
                          className="btn btn-xs text-xs btn-dark mx-1 text-white"
                          onClick={() => handleDelete(contest?._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContest;
