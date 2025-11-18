import React, { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import NotificationBell from "../component/voice-input/NotificationBell";

function Navbar({ theme = 'indigo' }) {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="flex flex-wrap p-4 flex-row justify-between items-center">
        <a href className="flex title-font font-medium items-center text-gray-900 mb-4 px-10 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-10 h-10 text-black p-2 bg-${theme}-500 rounded-full`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl">MyFinanceMate</span>
        </a>

        <div className="flex pl-[50px] justify-end">
          <nav className="md:ml-auto flex items-center text-base justify-center">
            <p className="pr-8"><NotificationBell /></p>
            <Link to='/dashboard' className="mr-5 hover:text-gray-900">Dashboard</Link>
            <Link to='/income' className="mr-5 hover:text-gray-900">Income</Link>
            <Link to='/expense' className="mr-5 hover:text-gray-900">Expenses</Link>
            <Link to='/viewtransaction' className="mr-5 hover:text-gray-900">View Transaction</Link>
            <Link to='/message' className="mr-5 hover:text-gray-900">Message</Link>
          </nav>

          <button
            onClick={() => handleClick("/logout")}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 mr-6 md:mt-0"
          >
            LogOut
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
Navbar.propTypes = {
  theme: PropTypes.string
};

export default Navbar;
