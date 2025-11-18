import React, { useState } from "react";
import PropTypes from  "prop-types";

function HomePageNavbar(props) {
  
  
  const [activeNav, setActiveNav] = useState("#about");

  return (
    <header className="bg-sky-700 text-white rounded-lg  body-font mt-4  w-[100%]">
      <div className="container mx-auto flex flex-wrap p-7 flex-col md:flex-row items-center">
        <a href className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-10 h-10 text-white p-2 bg-${props.theme}-500 rounded-full`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-2xl">MyFinanceMate</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-500	flex flex-wrap items-center text-xl justify-center ">
          <a href="#home" onClick={() => setActiveNav('#home')} className={`mr-5 hover:bg-[#8da242] text-black ${activeNav === "#home" ? "active-link" : ""}`}>
            Home Page</a>
          <a href="#service" onClick={() => setActiveNav('#service')} className={`mr-5 hover:bg-[#8da242] text-black ${activeNav === "#service" ? "active-link" : ""}`}>
            Service</a>
          <a href="#articles" onClick={() => setActiveNav('#articles')} className={`mr-5 hover:bg-[#8da242] text-black ${activeNav === "#articles" ? "active-link" : ""}`}>
            Financial Articles</a>
          <a href="#contact" onClick={() => setActiveNav('#contact')} className={`mr-5 hover:bg-[#8da242] text-black ${activeNav === "#contact" ? "active-link" : ""}`}>
            Contact Us</a>
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


