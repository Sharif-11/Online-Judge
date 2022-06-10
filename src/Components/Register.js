import React, { useRef, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate("");
  const handleRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [handleError, setHandleError] = useState(false);

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
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: handle });
  };

  if (loading || updating || googleLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    navigate("/login");
  }
  if (googleUser) {
    navigate("/");
  }
  return (
    <div>
      <h6 className="text-md font-bold mt-10">
        Fill in the form to register in Coders Playground.
      </h6>
      <p className="font-semibold">
        You can skip this step and login with your{" "}
        <button className="text-primary underline">Gmail</button>.
      </p>
      <div className="register rounded-sm border w-96 mx-auto mt-8">
        <h2 className="p-1 font-semibold text-[blue]">
          Register in Coders Playground
        </h2>
        <hr />
        <form className="my-8" onSubmit={handleSubmit}>
          <div className=" w-4/5 mx-auto flex">
            <span className="mr-4 text-md font-semibold w-1/4 text-right">
              Handle
            </span>
            <div className="w-3/4">
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
                {error?.message.includes("email") && "*email already in use"}
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
                {error?.message.includes("password") &&
                  "*at least 6 characters long"}
              </p>
            </div>
          </div>
          <div className=" w-4/5 mx-auto flex my-3">
            <span className="mr-4 text-md font-semibold w-1/4 text-right">
              Confirm Password
            </span>
            <div className="w-3/4 flex flex-col justify-center">
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
