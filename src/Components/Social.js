import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "./Home";
import { toast } from "react-toastify";
import useProfile from "../Hooks/useProfile";
const Social = () => {
  const { user } = useContext(userContext);
  const [profile, loading] = useProfile(user);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [institute, setInstitute] = useState("");
  useEffect(() => {
    const { fullName, city, country, institute } = profile;
    setName(fullName);
    setCity(city);
    setCountry(country);
    setInstitute(institute);
  }, [profile]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    if (name.replace(/\s/g, "").length != 0) {
      data.fullName = name;
    }
    if (city.replace(/\s/g, "").length != 0) {
      data.city = city;
    }
    if (country.replace(/\s/g, "").length != 0) {
      data.country = country;
    }
    if (institute.replace(/\s/g, "").length != 0) {
      data.institute = institute;
    }
    axios
      .put(`http://localhost:5000/users/social/${user?.email}`, data)
      .then(({ data }) => {
        if (data?.modifiedCount == 1) {
          toast.success("Changes saved successfully");
        } else if (data?.modifiedCount == 0) {
          toast.info("You don't change any information!");
        } else {
          toast.error("Changes failed to save");
        }
      });
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-3 my-4" style={{ borderRadius: "6px" }}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">Full Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">City</span>
          </label>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">Country</span>
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter Country"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs mx-auto">
          <label class="label">
            <span class="label-text font-semibold">Institution</span>
          </label>
          <input
            type="text"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="Enter Institution"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <input
          type="submit"
          className="btn btn-sm btn-outline mx-auto my-3"
          value="Save Changes"
        />
      </form>
    </div>
  );
};

export default Social;
