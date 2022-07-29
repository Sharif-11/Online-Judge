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
    fetch("https://lit-meadow-72602.herokuapp.com/users/" + handle)
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
    fetch("https://lit-meadow-72602.herokuapp.com/users", {
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
      <div className="register rounded-xl border w-96 max-w-[85vw] mx-auto mt-8 bg-[#3d4451]">
        <h2
          className="p-2 px-3 font-semibold text-[white] bg-[rgba(0,0,0,0.25)]"
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          Register in Coding playground
        </h2>
        <hr />
        <form className="my-8 px-4" onSubmit={handleSubmit}>
          <div className=" lg:w-4/5 mx-auto flex">
            <span className="pr-4 text-md font-semibold w-2/6 text-right text-white">
              UserName
            </span>
            <div className="w-4/6">
              <input
                type="text"
                name=""
                id=""
                className="border w-full text-white bg-transparent border-white px-1"
                ref={handleRef}
                required
              />
              <p className="text-[red] text-xs font-bold">
                {handleError && "*handle already in use"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-2/6 text-right text-white">
              Email
            </span>
            <div className="w-4/6">
              <input
                type="email"
                name=""
                id=""
                className="border w-full border-white bg-transparent text-white px-1"
                ref={emailRef}
                required
              />
              <p className="text-[red] text-xs font-bold">
                {error?.message.includes("email") && "*email already in use"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-1/3 text-right text-white">
              Password
            </span>
            <div className="w-2/3">
              <input
                type="password"
                name=""
                id=""
                className="border w-full bg-transparent px-1 text-white border-white"
                ref={passwordRef}
                required
              />
              <p className="text-xs text-[red] font-bold">
                {error?.message.includes("password") &&
                  "*at least 6 characters long"}
              </p>
            </div>
          </div>
          <div className=" lg:w-4/5 mx-auto flex my-3">
            <span className="pr-4 text-md font-semibold w-1/3 text-right text-white">
              Confirm Password
            </span>
            <div className="w-2/3 flex flex-col justify-center">
              <input
                type="password"
                name=""
                id=""
                className="border w-full bg-transparent text-white border-white px-1"
                ref={confirmPasswordRef}
                required
              />
              <p className="text-xs text-[red] font-bold">
                {confirmPasswordError && `*password doesn't match`}
              </p>
            </div>
          </div>
          <div className="flex justify-center my-[8px]">
            <ClipLoader loading={loading} size={24} />
          </div>
          <button
            type="submit"
            className="mx-auto border btn-xs text-white btn btn-outline block font-semibold px-5"
          >
            Register
          </button>
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

export default Register;
