import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "react-query";
import Preview from "./Preview";
const AllContest = ({ reload }) => {
  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("allContest", () =>
    fetch(
      "https://lit-meadow-72602.herokuapp.com/contests?requested=requested"
    ).then((res) => res.json())
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
  useEffect(() => {}, [data]);
  const handleAction = (id, action) => {
    if (action == "delete") {
    } else {
      const confirm = window.confirm(`Do you want to ${action} this contest?`);
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
                  {contest?.status == "requested" && (
                    <td className="flex justify-between">
                      {contest?.status === "requested" && (
                        <>
                          <label
                            for={`preview-${contest?.id}`}
                            class="btn modal-button btn-xs"
                          >
                            preview
                          </label>
                          <button
                            className="btn btn-xs"
                            onClick={() =>
                              handleAction(contest?._id, "publish")
                            }
                          >
                            Publish
                          </button>

                          <button
                            className="btn btn-xs"
                            onClick={() =>
                              handleAction(contest?._id, "discard")
                            }
                          >
                            Discard
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContest;
