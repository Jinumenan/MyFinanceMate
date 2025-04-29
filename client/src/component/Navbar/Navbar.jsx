import React from "react";
import PropTypes from  "prop-types";

function Navbar(props) {
  return (
    <header className="text-gray-600 body-font">
      <div className=" flex flex-wrap p-4 flex-row justify-between items-center">
        <a href className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-10 h-10 text-black p-2 bg-${props.theme}-500 rounded-full`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl">MyFinanceMate</span>
        </a>

        <div className="flex pl-[50px] justify-end">
            <nav className="md:ml-auto flex  items-center text-base justify-center">
            <a href className="mr-5 hover:text-gray-900">Dashboard</a>
            <a href className="mr-5 hover:text-gray-900">Income</a>
            <a href className="mr-5 hover:text-gray-900">Expenses</a>
            <a href className="mr-5 hover:text-gray-900">View Transaction</a>
            </nav>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            LogOut
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 "
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

Navbar.defaultProps = {
  theme: 'indigo'
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired
};

export default Navbar;