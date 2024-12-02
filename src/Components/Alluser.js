import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
const Alluser = () => {
  const { data, isLoading, refetch } = useQuery("allUsers", () =>
    fetch("https://cse-326-project-server.vercel.app/users").then((res) =>
      res.json()
    )
  );
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    fetch("https://cse-326-project-server.vercel.app/role")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      });
  }, []);
  const findUser = (email) => {
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].email == email) {
        return true;
      }
    }
    return false;
  };

  const updateRole = (id, role) => {
    const confirm = window.confirm("Do you want to proceed?");
    if (!confirm) {
      return;
    }
    fetch(`https://cse-326-project-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" my-5 mx-2 lg:m-5" onMouseOver={() => refetch()}>
      <div class="overflow-x-auto ">
        <table class="table w-full max-w-[96vw] mx-auto overflow-x-scroll">
          <thead>
            <tr className="bg-[#3d4451]">
              <th className="bg-transparent text-white"></th>
              <th className="bg-transparent text-white">Name</th>
              <th className="bg-transparent text-white">Handle</th>
              <th className="bg-transparent text-white">Role</th>
              <th className="bg-transparent text-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-[#3d4451]">
            {data?.map((user, id) => (
              <tr className="even:bg-[transparent] odd:bg-[rgba(0,0,0,0.2)]">
                <th className="bg-transparent text-white">{id + 1}</th>
                <td className="bg-transparent text-white">{user?.email}</td>
                <td className="bg-transparent text-white">{user?.handle}</td>
                <td className="bg-transparent text-white">
                  {user?.role || "user"}
                </td>
                <td className="bg-transparent text-white">
                  {(user?.role == "user" || !user?.role) &&
                    findUser(user?.email) && (
                      <button
                        className="btn btn-xs text-[white] btn-outline hover:border-white"
                        onClick={() => updateRole(user?._id, "problemSetter")}
                      >
                        Make problemsetter
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alluser;
