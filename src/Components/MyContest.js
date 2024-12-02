import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";
import { userContext } from "./Home";
import Preview from "./Preview";
const MyContest = ({ reload }) => {
  const { user } = useContext(userContext);
  const { data, isLoading, refetch } = useQuery("myContest", () =>
    fetch(
      "https://cse-326-project-server.vercel.app/contests/" + user?.email
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <p>Loading....</p>;
  }
  const handleRequest = (id) => {
    fetch(`https://cse-326-project-server.vercel.app/contests/${id}`, {
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
    fetch(`https://cse-326-project-server.vercel.app/contests/${id}`, {
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
            <tr className="bg-[#3d4451]">
              <th className="bg-transparent text-white"></th>
              <th className="bg-transparent text-white">Contest Id</th>
              <th className="bg-transparent text-white">Start Time</th>
              <th className="bg-transparent text-white">Status</th>
              <th className="bg-transparent text-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {data?.map((contest, idx) => (
              <>
                <input
                  type="checkbox"
                  id={`preview-${contest?.id}`}
                  class="modal-toggle"
                />
                <div class="modal  bg-transparent max-w-[60%] left-[400px] z-50">
                  <div class="modal-box border-2 w-11/12 max-w-5xl">
                    <Preview contest={contest} />
                    <div class="modal-action">
                      <label for={`preview-${contest?.id}`} class="btn">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
                <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
                  <th className="bg-transparent text-white">
                    {data?.length - idx}
                  </th>
                  <td className="bg-transparent text-white">{contest?.id}</td>
                  <td className="bg-transparent text-white">
                    {new Date(contest?.startTime)
                      .toString()
                      .replace("(Bangladesh Standard Time)", "")}
                  </td>

                  <td className="bg-transparent text-white">
                    {contest?.status}
                  </td>
                  <td className="bg-transparent text-white">
                    {contest?.status == "published" ? (
                      <button className="btn btn-sm btn-dark text-white text-[gray] hover:text-[gray] hover:bg-transparent hover:border-[gray] hover:border-[gray]">
                        Delete
                      </button>
                    ) : (
                      <>
                        <label
                          for={`preview-${contest?.id}`}
                          class="btn modal-button btn-xs btn-outline text-white hover:border-white"
                        >
                          preview
                        </label>

                        {(contest?.status == "discarded" ||
                          contest?.status == "pending") && (
                          <button className="btn btn-xs text-xs btn-dark mx-1 text-white btn-outline hover:border-white">
                            edit
                          </button>
                        )}

                        {(contest?.status == "pending" ||
                          contest?.status == "discarded") && (
                          <button
                            className="btn btn-outline hover:border-white btn-xs my-2  btn-dark text-white"
                            onClick={() => handleRequest(contest?._id)}
                          >
                            Request to publish
                          </button>
                        )}
                        <button
                          className="btn btn-xs btn-outline hover:border-white  text-xs btn-dark mx-1 text-white"
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
