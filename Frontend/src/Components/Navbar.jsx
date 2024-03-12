import React, { useState } from "react";
import { IoIosSettings, IoIosMenu, IoIosClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ toggleSidebarLeft, toggleSidebarRight }) => {
  return (
    <div>
      <nav className="bg-gray-800 w-screen">
        <div className="flex justify-between items-center h-20 px-6">
          <div className="flex items-center">

            <button
              onClick={toggleSidebarLeft}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <IoIosMenu className="w-6 h-6" />
            </button>

            <img src="./images/3squared.png" className="mr-2 ml-8" width={50} height={50}></img>
            <a href="/App" className="text-white">3Squared</a>
          </div>

          <div className="flex rounded-md max-w-[500px] w-full justify-center">
            <input
              type="text"
              name="q"
              id="query"
              placeholder="Train History"
              className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none"
            />
            <button className="inline-flex items-center gap-2 bg-gray-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
              <span>
                <FaSearch />
              </span>
            </button>
          </div>

          <div className="flex">
            

            <button
              onClick={toggleSidebarRight}
              className="text-gray-500 focus:outline-none focus:text-gray-600 ml-2"
            >
              <IoIosMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


