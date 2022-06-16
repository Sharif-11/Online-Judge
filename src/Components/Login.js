import React, { useRef } from "react";
import { toast } from "react-toastify";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateEmail,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import ClipLoader from "react-spinners/ClipLoader";
const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
  };
  const [sendPasswordResetEmail, sending, sendingError] =
    useSendPasswordResetEmail(auth);
  if (sending) {
    toast("password reset email send");
  }
  if (user || googleUser) {
    navigate("/");
  }
  if (googleUser) {
    fetch("https://lit-meadow-72602.herokuapp.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: googleUser?.user?.email,
        handle: googleUser?.user?.displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="mb-8">
      <div className="register rounded-sm border w-96 max-w-[85vw] mx-auto mt-8">
        <h2 className="p-1 font-semibold text-[blue]">
          Log into Coding playground
        </h2>
        <hr />
        <form className="my-8 px-4 lg:px-0" onSubmit={handleSubmit}>
          <div className=" lg:w-4/5 mx-auto flex my-3 ">
            <span className="pr-4 text-md font-semibold w-2/6  text-right">
              Email
            </span>
            <div className="w-4/6">
              <input
                type="email"
                name=""
                id=""
                className="w-full border"
                ref={emailRef}
                required
              />
              <p className="text-[red] text-xs">
                {error?.message.includes("user") && "*user not found"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-2/6 text-right">
              Password
            </span>
            <div className="w-4/6">
              <input
                type="password"
                name=""
                id=""
                className="w-full border"
                ref={passwordRef}
                required
              />
              <p className="text-xs text-[red]">
                {error?.message.includes("password") && "*wrong password"}
              </p>
            </div>
          </div>
          <div className="flex justify-center my-[8px]">
            <ClipLoader loading={loading} size={24} />
          </div>

          <button
            type="submit"
            className="mx-auto border block font-semibold px-5"
          >
            Login
          </button>

          <button
            type="button"
            className="text-[blue] text-sm underline block ml-auto mr-2 lg:mr-4  mt-4"
            onClick={async () => {
              if (emailRef.current.value) {
                await sendPasswordResetEmail(emailRef.current.value);
              }
            }}
          >
            Forgot your password?
          </button>
        </form>
        <div className="bottom flex justify-end py-1 pr-2 bg-[rgba(0,0,0,0.02)]">
          <button
            className="text-sm text-primary underline"
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
