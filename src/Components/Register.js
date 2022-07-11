import React, { useRef, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PreLoader from "./PreLoader";
import { ClipLoader } from "react-spinners";
const Register = () => {
  const navigate = useNavigate("");
  const handleRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [handleError, setHandleError] = useState(false);
  const [person, userLoading, userError] = useAuthState(auth);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, {
      sendEmailVerification: true,
    });
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const handle = handleRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    } else setConfirmPasswordError(false);
    fetch("http://localhost:5000/users/" + handle)
      .then((res) => res.json())
      .then((data) => {
        if (data?.handle === handle) {
          setHandleError(true);
          return;
        } else {
          setHandleError(false);
        }
      });
    if (handleError) {
      return;
    }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: handle });
  };

  if (updating || googleLoading || userLoading) {
    return <p>Loading...</p>;
  }
  if (person) {
    fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: person?.email,
        handle: person?.displayName,
        role: "user",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  if (user) {
    navigate("/login");
  }
  if (googleUser) {
    navigate("/");
  }
  return (
    <div className="mb-8">
      <div className="register rounded-sm border w-96 max-w-[85vw] mx-auto mt-8">
        <h2 className="p-1 font-semibold text-[blue]">
          Register in Coding playground
        </h2>
        <hr />
        <form className="my-8 px-4" onSubmit={handleSubmit}>
          <div className=" lg:w-4/5 mx-auto flex">
            <span className="pr-4 text-md font-semibold w-2/6 text-right">
              Handle
            </span>
            <div className="w-4/6">
              <input
                type="text"
                name=""
                id=""
                className="border w-full"
                ref={handleRef}
                required
              />
              <p className="text-[red] text-xs">
                {handleError && "*handle already in use"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-2/6 text-right">
              Email
            </span>
            <div className="w-4/6">
              <input
                type="email"
                name=""
                id=""
                className="border w-full"
                ref={emailRef}
                required
              />
              <p className="text-[red] text-xs">
                {error?.message.includes("email") && "*email already in use"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-1/3 text-right">
              Password
            </span>
            <div className="w-2/3">
              <input
                type="password"
                name=""
                id=""
                className="border w-full"
                ref={passwordRef}
                required
              />
              <p className="text-xs text-[red]">
                {error?.message.includes("password") &&
                  "*at least 6 characters long"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-1/3 text-right">
              Confirm Password
            </span>
            <div className="w-2/3 flex flex-col justify-center">
              <input
                type="password"
                name=""
                id=""
                className="border w-full"
                ref={confirmPasswordRef}
                required
              />
              <p className="text-xs text-[red]">
                {confirmPasswordError && `*password doesn't match`}
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
            Register
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

export default Register;
