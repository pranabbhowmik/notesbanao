import React, { useContext, useState } from "react";
import Usercontext from "../context/Usercontext";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const Log = ({ mode }) => {
  const [login, setLogin] = useState(""); // Track login state
  const { setUser } = useContext(Usercontext);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ login }); // Update user context
    navigate('/addnote'); // Navigate to the Addnote page
  };

  return (
    <div
      className={`flex mt-10 justify-center min-h-screen ${
        mode === "light" ? "bg-white text-black" : "bg-slate-900 text-white"
      }`}
    >
      <div
        className={`${
          mode === "light"
            ? "bg-white text-black"
            : "bg-slate-900 border-black border-2 shadow-xl shadow-purple-500 text-white"
        } p-8 rounded-lg shadow-lg h-80 w-full max-w-sm`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className={`block text-gray-700 text-sm font-medium mb-2 ${
                mode === "light"
                  ? "bg-white text-black"
                  : "bg-slate-900 text-white"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={login} // Use login state
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-3 py-3 mt-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-robotoMono text-black font-semibold"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-32 items-center mt-10 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 font-robotoMono font-semibold focus:ring-blue-500 ${
              mode === "light"
                ? "bg-blue-600 hover:bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Log;
