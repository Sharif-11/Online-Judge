import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
const Alluser = () => {
  const { data, isLoading, refetch } = useQuery("allUsers", () =>
    fetch("https://lit-meadow-72602.herokuapp.com/users").then((res) =>
      res.json()
    )
  );
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    fetch("https://lit-meadow-72602.herokuapp.com/role")
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
    fetch(`https://lit-meadow-72602.herokuapp.com/users/${id}`, {
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
            <tr>
              <th></th>
              <th>Name</th>
              <th>User Id</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, id) => (
              <tr>
                <th>{id + 1}</th>
                <td>{user?.email}</td>
                <td>{user?.handle}</td>
                <td>{user?.role || "user"}</td>
                <td>
                  {(user?.role == "user" || !user?.role) &&
                    findUser(user?.email) && (
                      <button
                        className="btn btn-xs text-[white]"
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
