import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const adminLoginFunction = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/api/forget`, {
      email: email,
    });
    if (response.status === 200) {
      navigate("/update");
    }
  };
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          forget Password
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
            type="submit"
            value={"Send email"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
