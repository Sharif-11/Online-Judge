import React from "react";
import { useQuery } from "react-query";
const Alluser = () => {
  const { data, isLoading, refetch } = useQuery("allUsers", () =>
    fetch("http://localhost:5000/users").then((res) => res.json())
  );
  const updateRole = (id, role) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.updatedCount) {
          refetch();
        }
      });
  };
  return (
    <div className="m-5">
      <div class="overflow-x-auto ">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Handle</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, id) => (
              <tr>
                <th>{id + 1}</th>
                <td>{user?.email}</td>
                <td>{user?.handle}</td>
                <td>{user?.role || "user"}</td>
                {user?.role !== "admin" && (
                  <td>
                    <button
                      className="btn btn-xs text-[white]"
                      onClick={() => updateRole(user?._id, "problemSetter")}
                    >
                      Make problemsetter
                    </button>
                  </td>
                )}
                {user?.role !== "admin" && (
                  <td>
                    <button
                      className="btn btn-xs text-[white]"
                      onClick={() => updateRole(user?._id, "user")}
                    >
                      Make user
                    </button>
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

export default Alluser;
