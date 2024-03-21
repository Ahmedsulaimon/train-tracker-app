import React from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import TiplocData from "../data/tiplocs.json";
import SearchBar from "../Components/Searchbar";
import Countdown from "./CountDown";

const Navbar = ({
  toggleSidebarLeft,
  toggleSidebarRight,
  moveToLocation,
  openSideBars,
  resetSelectedJourneyIndex,
  resetData,
}) => {
  return (
    <div>
      <nav className="bg-gray-800 w-screen">
        <div className="flex justify-between items-center h-20 px-6">
          <div className="flex items-center">
            <button
              onClick={toggleSidebarLeft}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              aria-label="left sidebar"
            >
              <FaAngleDoubleLeft color="white" className="w-6 h-6" />
            </button>

            <img
              src="./images/3squared.png"
              className="mr-2 ml-8"
              width={50}
              height={50}
              alt="3Squared Logo"
            ></img>
            <a href="/App" className="text-white">
              3Squared
            </a>
          </div>

          <div className="flex rounded-md mt-2">
            <SearchBar
              data={TiplocData}
              moveToLocation={moveToLocation}
              openSideBars={openSideBars}
              resetSelectedJourneyIndex={resetSelectedJourneyIndex}
              resetData={resetData}
            />
            <div className=" flex items-center">
              <Countdown className="" />
            </div>
          </div>

          <div className="flex ">
            <button
              onClick={toggleSidebarRight}
              className="text-gray-500 focus:outline-none focus:text-gray-600 ml-2"
              aria-label="right sidebar"
            >
              <FaAngleDoubleRight color="white" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
