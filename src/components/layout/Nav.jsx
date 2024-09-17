import React, { useState, useEffect } from "react";
import { TbLogout2 } from "react-icons/tb";
import logo from "../../assets/note.png";
import { BsSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";

const Nav = ({ mode, handelmode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState("Log-In");
  const location = useLocation(); // Hook to get the current route

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle login/logout toggle
  const handleLoginLogout = () => {
    setLogin((prev) => (prev === "Log-In" ? "Log-Out" : "Log-In"));
  };

  // Update login state based on the current route
  useEffect(() => {
    if (location.pathname === "/addnote") {
      setLogin("Log-Out");
    } else {
      setLogin("Log-In");
    }
  }, [location.pathname]); // Run effect whenever the pathname changes

  return (
    <nav
      className={`${
        mode === "light" ? "bg-white text-black" : "bg-slate-900 text-white"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="NoteApp Logo" />
          <span className="self-center text-2xl font-Mochiy whitespace-nowrap">
            Note-Maker
          </span>
        </a>
        <span
          onClick={handelmode}
          className="flex items-center space-x-2 px-3 cursor-pointer text-whiterounded md:bg-transparent  md:p-0 dark:text-white "
        >
          {mode === "light" ? (
            <BsFillMoonStarsFill className="w-7 h-7 text-black" />
          ) : (
            <BsSunFill className="w-7 h-7" />
          )}
        </span>

        <button
          onClick={toggleMenu} // Toggle the menu on button click
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen} // aria-expanded should reflect the state
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="flex items-center space-x-2 py-2 px-3 text-white bg-blue-700 rounded"
                aria-current="page"
                onClick={handleLoginLogout} // Toggle login/logout text on click
              >
                <TbLogout2 className="w-5 h-5" />{" "}
                {/* Adjust icon size if needed */}
                <span>{login}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
