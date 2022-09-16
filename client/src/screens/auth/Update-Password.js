import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const adminLoginFunction = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/api/update`, {
      email,
      code: otp,
      password,
    });
    if (response.status === 200) {
      navigate("/");
    }
  };
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          Update Password
        </h3>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="enter email address"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="otp"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            placeholder="enter otp"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="enter new password"
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value={"Update Password"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
