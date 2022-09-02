import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useQuery } from "react-query";
import Preview from "./Preview";
import PreviewOffline from "./PreviewOffline";
import PreviewProblem from "./PreviewProblem";
const MyProblems = () => {
  const [user, loading] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("myProblems", () =>
    fetch("https://lit-meadow-72602.herokuapp.com/offline/" + user?.email).then(
      (res) => res.json()
    )
  );
  if (isLoading || loading) {
    return <p>Loading....</p>;
  }
  const handleRequest = (id) => {
    fetch(`https://lit-meadow-72602.herokuapp.com/offline/problems/${id}`, {
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
    const confirm = window.confirm("Do you want to delete this problem?");
    if (!confirm) {
      return;
    }
    fetch(`https://lit-meadow-72602.herokuapp.com/offline/problem/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount) {
          refetch();
          //   reload();
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
              <th className="bg-transparent text-white">Problem Id</th>
              <th className="bg-transparent text-white">Problem Title</th>
              <th className="bg-transparent text-white">Status</th>
              <th className="bg-transparent text-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {data?.map((problem, idx) => (
              <>
                <input
                  type="checkbox"
                  id={`preview-${problem?._id}`}
                  class="modal-toggle"
                />
                <div class="modal  bg-transparent max-w-[60%] left-[400px] z-50">
                  <div class="modal-box border-2 w-11/12 max-w-5xl">
                    <PreviewOffline {...problem}></PreviewOffline>

                    <div class="modal-action">
                      <label for={`preview-${problem?._id}`} class="btn">
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
                  <td className="bg-transparent text-white">
                    {problem?.status == "published" ? (
                      <button className="btn btn-sm btn-dark text-white text-[gray] hover:text-[gray] hover:bg-transparent hover:border-[gray] hover:border-white">
                        Delete
                      </button>
                    ) : (
                      <>
                        <label
                          for={`preview-${problem?._id}`}
                          class="btn modal-button btn-xs btn-outline text-white hover:border-white"
                        >
                          preview
                        </label>

                        {(problem?.status == "discarded" ||
                          problem?.status == "pending") && (
                          <button className="btn btn-xs text-xs btn-dark mx-1 text-white btn-outline hover:border-white">
                            edit
                          </button>
                        )}

                        {(problem?.status == "pending" ||
                          problem?.status == "discarded") && (
                          <button
                            className="btn btn-outline hover:border-white btn-xs my-2  btn-dark text-white"
                            onClick={() => handleRequest(problem?._id)}
                          >
                            Request to publish
                          </button>
                        )}
                        <button
                          className="btn btn-xs btn-outline hover:border-white  text-xs btn-dark mx-1 text-white"
                          onClick={() => handleDelete(problem?._id)}
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

export default MyProblems;
