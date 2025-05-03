import React from "react";
import PropTypes from  "prop-types";

function HomePageNavbar(props) {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center">
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
          <span className="ml-3 text-2xl">MyFinanceMate</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-xl justify-center ">
          <a href className="mr-5 hover:text-yellow-400">Home Page</a>
          <a href className="mr-5 hover:text-yellow-400">Service</a>
          <a href className="mr-5 hover:text-yellow-400">Financial Articlies</a>
          <a href className="mr-5 hover:text-yellow-400">Contact Us</a>
        </nav>

      </div>
    </header>
  );
}

HomePageNavbar.defaultProps = {
  theme: 'indigo'
};

HomePageNavbar.propTypes = {
  theme: PropTypes.string.isRequired
};

export default HomePageNavbar;