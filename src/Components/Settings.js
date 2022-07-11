import React, { useEffect, useRef, useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const Settings = () => {
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [error, setError] = useState(false);
  const [updatePassword, updating, updateError] = useUpdatePassword(auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password != confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      const f = async () => {
        await updatePassword(password);
      };
      f();
    }
  };

  return (
    <div className="border my-4 p-3" style={{ borderRadius: "6px" }}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">New Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            class="input input-bordered w-full max-w-xs"
            ref={passwordRef}
          />
        </div>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            class="input input-bordered w-full max-w-xs"
            ref={confirmPasswordRef}
          />
          <label class="label">
            <span class="label-text-alt text-[red]">
              {error && `*password doesn't match`}
            </span>
          </label>
        </div>
        <input
          type="submit"
          className="btn btn-sm btn-outline  mx-auto my-3"
          value="Save Changes"
        />
      </form>
    </div>
  );
};

export default Settings;
