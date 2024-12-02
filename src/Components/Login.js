import React, { useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const Login = () => {
  const [email, setEmail] = useState("sharif@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [sendPasswordResetEmail, sending, sendingError] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  if (sending) {
    toast("Password reset email sent");
  }

  if (googleUser) {
    fetch("https://cse-326-project-server.vercel.app/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: googleUser?.user?.email,
        handle: googleUser?.user?.displayName,
        role: "user",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  let from = location.state?.from?.pathname || "/";
  if (user || googleUser) {
    navigate(from, { replace: true });
  }

  return (
    <div className="mb-8">
      <div className="register rounded-xl border w-96 max-w-[85vw] mx-auto mt-8 bg-[#3d4451]">
        <h2
          className="p-2 px-3 font-semibold text-white bg-[rgba(0,0,0,0.25)]"
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          Log into Coding Playground
        </h2>
        <hr />
        <form className="my-8 px-4 lg:px-0" onSubmit={handleSubmit}>
          <div className="lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-2/6 text-right text-white">
              Email
            </span>
            <div className="w-4/6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-white bg-transparent text-white rounded-sm px-1"
                required
              />
              <p className="text-[red] font-bold text-xs">
                {error?.message.includes("user") && "*user not found"}
              </p>
            </div>
          </div>
          <div className="lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-2/6 text-right text-white">
              Password
            </span>
            <div className="w-4/6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border text-white border-white bg-transparent px-1"
                required
              />
              <p className="text-xs font-bold text-[red]">
                {error?.message.includes("password") && "*wrong password"}
              </p>
            </div>
          </div>
          <div className="flex justify-center my-[8px]">
            <ClipLoader loading={loading} size={24} />
          </div>

          <button
            type="submit"
            className="mx-auto block text-white btn btn-xs px-5 btn-outline border-white"
          >
            Login
          </button>
          {/* <button
            type="button"
            className="text-[white] text-sm underline block ml-auto mr-2 lg:mr-4  mt-4"
            onClick={async () => {
              if (emailRef.current.value) {
                await sendPasswordResetEmail(emailRef.current.value);
              }
            }}
          >
            Forgot your password?
          </button> */}
        </form>
        <div
          className="bottom flex justify-end py-1 pr-2 bg-[rgba(0,0,0,0.25)]"
          style={{
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          <button
            className="text-sm text-primary underline py-1"
            onClick={() => signInWithGoogle()}
          >
            Use Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
