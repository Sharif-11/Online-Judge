import React, { useRef } from "react";
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
  }
  if (user || googleUser) {
    navigate("/");
  }
  return (
    <div>
      <div className="register rounded-sm border w-96 mx-auto mt-8">
        <h2 className="p-1 font-semibold text-[blue]">
          Log into Coding playground
        </h2>
        <hr />
        <form className="my-8" onSubmit={handleSubmit}>
          <div className=" w-4/5 mx-auto flex my-3">
            <span className="mr-4 text-md font-semibold w-1/4 text-right">
              Email
            </span>
            <div className="w-3/4">
              <input
                type="email"
                name=""
                id=""
                className="border w-full"
                ref={emailRef}
                required
              />
              <p className="text-[red] text-xs">
                {error?.message.includes("user") && "*user not found"}
              </p>
            </div>
          </div>
          <div className=" w-4/5 mx-auto flex my-3">
            <span className="mr-4 text-md font-semibold w-1/4 text-right">
              Password
            </span>
            <div className="w-3/4">
              <input
                type="password"
                name=""
                id=""
                className="border w-full"
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
            className="text-[blue] text-sm underline block ml-auto mr-4 mt-4"
            onClick={async () => {
              await sendPasswordResetEmail(emailRef.current.value);
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