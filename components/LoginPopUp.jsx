import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const LoginPopUp = ({ setShowLogin }) => {
  const [current, setCurrent] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const endpoint = current === "Login" ? "/api/login" : "/api/register";

    try {
      const response = await axios.post(endpoint, data);
      if (current === "Login") {
        const { token } = response.data;
  if (token) {
    localStorage.setItem("authToken", token);
    setSuccess("Login successful!");
  } else {
    setError("Failed to retrieve authentication token.");
  }
        localStorage.setItem("authToken", token);
        setSuccess("Login successful!");
      } else {
        setSuccess("Account created successfully!");
      }

      setTimeout(() => {
        setShowLogin(false); 
      }, 1000);
    } catch (err) {
      console.log('----->:', err.response || err)
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{current}</h2>
          <IoMdClose
            className="text-gray-600 hover:text-gray-800 text-2xl cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <form onSubmit={onLogin}>
          <div className="space-y-4">
            {current === "Sign Up" && (
              <input
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full h-12 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-900 hover:shadow-lg transition-all"
          >
            {current === "Sign Up" ? "Create an account" : "Login"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <div className="mt-4 text-center text-gray-600">
            {current === "Login" ? (
              <p>
                Create a new account?{" "}
                <span
                  onClick={() => setCurrent("Sign Up")}
                  className="text-blue-500 font-medium cursor-pointer"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Already a member?{" "}
                <span
                  onClick={() => setCurrent("Login")}
                  className="text-blue-500 font-medium cursor-pointer"
                >
                  Login here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;