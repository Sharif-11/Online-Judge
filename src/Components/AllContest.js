import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Preview from "./Preview";
import { userContext } from "./Home";
const AllContest = ({ reload }) => {
  const { user } = useContext(userContext);
  const { data, isLoading, refetch } = useQuery("allContest", () =>
    fetch("http://localhost:5000/contests?requested=requested").then((res) =>
      res.json()
    )
  );
  const handleStatus = (id, status) => {
    fetch("http://localhost:5000/contests/" + id, {
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
  if (isLoading) {
    return <p>Loading...</p>;
  }
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
                  id={`preview2-${contest?.id}`}
                  class="modal-toggle"
                />
                <div class="modal  bg-transparent max-w-[60%] left-[400px] z-50">
                  <div class="modal-box border-2 w-11/12 max-w-5xl">
                    <Preview contest={contest} />
                    <div class="modal-action">
                      <label for={`preview2-${contest?.id}`} class="btn">
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
                            for={`preview2-${contest?.id}`}
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
