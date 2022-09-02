import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "react-query";
import PreviewOffline from "./PreviewOffline";
import Problems from "./Problems";
const OfflineAllProblems = () => {
  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("AllOfflineProblem", () =>
    fetch("https://lit-meadow-72602.herokuapp.com/offline-problems").then(
      (res) => res.json()
    )
  );
  const handleStatus = (id, status) => {
    fetch("https://lit-meadow-72602.herokuapp.com/offline-problems/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: status + "ed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        // reload();
      });
  };

  const handleAction = (id, action) => {
    if (action == "delete") {
    } else {
      const confirm = window.confirm(`Do you want to ${action} this problem?`);
      if (!confirm) {
        return;
      }
      handleStatus(id, action);
    }
  };
  if (isLoading || loading) {
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
              <th className="bg-transparent text-white">Title</th>
              <th className="bg-transparent text-white">Status</th>
              <th className="bg-transparent text-white text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {data?.map((problem, idx) => (
              <>
                <input
                  type="checkbox"
                  id={`preview2-${problem?._id}`}
                  class="modal-toggle"
                />
                <div class="modal  bg-transparent max-w-[60%] left-[400px] z-50">
                  <div class="modal-box border-2 w-11/12 max-w-5xl">
                    <PreviewOffline {...problem}></PreviewOffline>

                    <div class="modal-action">
                      <label for={`preview2-${problem?._id}`} class="btn">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
                <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
                  <th className="bg-transparent text-white">
                    {data?.length - idx}
                  </th>
                  <td className="bg-transparent text-white">{problem?._id}</td>
                  <td className="bg-transparent text-white">
                    {problem?.title}
                  </td>

                  <td className="bg-transparent text-white">
                    {problem?.status}
                  </td>
                  {problem?.status == "requested" ? (
                    <td className="flex justify-between bg-transparent text-white">
                      {problem?.status === "requested" && (
                        <>
                          <label
                            for={`preview2-${problem?._id}`}
                            class="btn modal-button btn-xs  btn-outline text-white hover:border-white"
                          >
                            preview
                          </label>
                          <button
                            className="btn btn-xs btn-outline text-white hover:border-white"
                            onClick={() =>
                              handleAction(problem?._id, "publish")
                            }
                          >
                            Publish
                          </button>

                          <button
                            className="btn btn-xs text-white hover:border-white btn-outline"
                            onClick={() =>
                              handleAction(problem?._id, "discard")
                            }
                          >
                            Discard
                          </button>
                        </>
                      )}
                    </td>
                  ) : (
                    <td className="bg-transparent text-white flex justify-center">
                      <>
                        <button
                          className="btn btn-xs 
                         text-white hover:border-white text-[gray] hover:text-[gray] hover:bg-transparent hover:border-[gray] hover:border-white btn-outline"
                        >
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

export default OfflineAllProblems;
