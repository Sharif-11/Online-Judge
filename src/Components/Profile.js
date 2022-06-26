import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import useRole from "../Hooks/useRole";
const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [sending, setSending] = useState(false);
  const [role, roleLoading] = useRole(user);

  const handleRequest = () => {
    fetch("http://localhost:5000/role", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email, handle: user?.displayName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("Request sent successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setSending(true);
        }
      });
  };
  if (loading || roleLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      {role == "user" && (
        <div>
          <h1 className="my-2">Do you want to be a problemsetter</h1>
          {sending ? (
            <button className="btn btn-xs">Request send</button>
          ) : (
            <button className="btn btn-xs" onClick={handleRequest}>
              Send Request
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
