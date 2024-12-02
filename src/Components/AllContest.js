import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { userContext } from "./Home";
import Preview from "./Preview";
const AllContest = ({ reload }) => {
  const { user } = useContext(userContext);
  const { data, isLoading, refetch } = useQuery("allContest", () =>
    fetch(
      "https://cse-326-project-server.vercel.app/contests?requested=requested"
    ).then((res) => res.json())
  );
  const handleStatus = (id, status) => {
    fetch("https://cse-326-project-server.vercel.app/contests/" + id, {
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
            <tr className="bg-[#3d4451]">
              <th className="bg-transparent text-white"></th>
              <th className="bg-transparent text-white">Id</th>
              <th className="bg-transparent text-white">Email</th>
              <th className="bg-transparent text-white">Start Time</th>
              <th className="bg-transparent text-white">Status</th>
              <th className="bg-transparent text-white text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
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
                <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
                  <th className="bg-transparent text-white">
                    {data?.length - idx}
                  </th>
                  <td className="bg-transparent text-white">{contest?.id}</td>
                  <td className="bg-transparent text-white">
                    {contest?.email}
                  </td>
                  <td className="bg-transparent text-white">
                    {new Date(contest?.startTime)
                      .toString()
                      .replace("(Bangladesh Standard Time)", "")}
                  </td>
                  <td className="bg-transparent text-white">
                    {contest?.status}
                  </td>
                  {contest?.status == "requested" ? (
                    <td className="flex justify-between bg-transparent text-white">
                      {contest?.status === "requested" && (
                        <>
                          <label
                            for={`preview2-${contest?.id}`}
                            class="btn modal-button btn-xs  btn-outline text-white hover:border-white"
                          >
                            preview
                          </label>
                          <button
                            className="btn btn-xs btn-outline text-white hover:border-white"
                            onClick={() =>
                              handleAction(contest?._id, "publish")
                            }
                          >
                            Publish
                          </button>

                          <button
                            className="btn btn-xs text-white hover:border-white btn-outline"
                            onClick={() =>
                              handleAction(contest?._id, "discard")
                            }
                          >
                            Discard
                          </button>
                        </>
                      )}
                    </td>
                  ) : (
                    <td className="bg-transparent flex justify-center">
                      <>
                        <button className="btn btn-xs text-[gray] hover:text-[gray] hover:bg-transparent hover:border-[gray] hover:border-white btn-outline">
                          Discard
                        </button>
                      </>
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
