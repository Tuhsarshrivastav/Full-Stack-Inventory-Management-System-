import React, { useState } from "react";
import Wrapper from "./Wrapper";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const res = localStorage.getItem("admin-token");
  const user = jwtDecode(res);
  const adminLoginFunction = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/update/${user.id}`,
      {
        name: name,
        password: password,
      }
    );
    if (response.status === 200) {
      navigate("/dashboard/products");
    }
  };

  console.log(user);
  return (
    <Wrapper>
      <form
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-full lg:w-full rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          Update details
        </h3>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="enter new name"
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
            value={"Update Details"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateUser;
