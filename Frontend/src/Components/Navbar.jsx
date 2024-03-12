import React from "react";
import { IoIosSettings } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-screen">
      <div className="flex justify-between items-center h-16 px-8">
        <div className="flex">
          <a href="/App" className="text-white">
            3Squared
          </a>
        </div>

        <div className="flex rounded-md max-w-[500px] w-full justify-center">
          <button className="inline-flex items-center gap-2 bg-gray-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
            <span>
              <FaSearch />
            </span>
          </button>
        </div>

        <div className="flex">
          <a
            className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
          >
            <IoIosSettings className="w-6 h-6" />
          </a>

          <a
            className="ml-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
          >
            <RiUserSettingsLine className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
