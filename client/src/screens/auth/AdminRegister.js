import { useState, useEffect } from "react";
import { useUserRegisterMutation } from "../../store/services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../store/reducers/authReducer";
import { Link } from "react-router-dom";
const AdminRegister = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [register, response] = useUserRegisterMutation();
  console.log("my response", response);
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];
  const adminLoginFunction = (e) => {
    e.preventDefault();
    register(state);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      navigate("/");
    }
  }, [response.isSuccess]);
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
        onSubmit={adminLoginFunction}
      >
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">
          Register login
        </h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
        <div className="mb-4 mt-4">
          <input
            type="email"
            name="email"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={handleInputs}
            value={state.email}
            placeholder="Enter email..."
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="text"
            name="name"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={handleInputs}
            value={state.name}
            placeholder="Enter name..."
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="w-full bg-black1 p-4 rounded outline-none text-white"
            onChange={handleInputs}
            value={state.password}
            placeholder="Enter password..."
          />
        </div>
        <div className="mb-4">
          <input
            type="submit"
            value={response.isLoading ? "Loading..." : "sign up"}
            className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
        <Link to="/" className="text-white capitalize font-semibold text-lg">
          Login
        </Link>
      </form>
    </div>
  );
};
export default AdminRegister;
