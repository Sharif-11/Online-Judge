import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import useRole from "../Hooks/useRole";
const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [sending, setSending] = useState(false);
  const [role, roleLoading] = useRole(user);
  const [show, setShow] = useState(true);
  const handleRequest = () => {
    fetch("https://lit-meadow-72602.herokuapp.com/role", {
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
  useEffect(() => {
    fetch("https://lit-meadow-72602.herokuapp.com/role")
      .then((res) => res.json())
      .then((data) => {
        let sz = data.length;
        for (let i = 0; i < sz; i++) {
          if (data[i].email == user?.email) {
            setShow(false);
          }
        }
      });
  }, [sending]);

  if (loading || roleLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      {role == "user" && (
        <div>
          <h1 className="my-2">Do you want to be a problemsetter</h1>
          {show ? (
            <button className="btn btn-xs" onClick={handleRequest}>
              Send Request
            </button>
          ) : (
            <button className="btn btn-xs">Request Send</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
