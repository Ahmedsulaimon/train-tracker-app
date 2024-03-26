import React, { useState } from "react";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import { GoDash } from "react-icons/go";

const Footer = () => {
  const [dropupVisible, setDropupVisible] = useState(false);

  const toggleDropup = () => {
    setDropupVisible(!dropupVisible);
  };

  return (
    <footer className="bg-gray-800 text-gray-100 flex justify-between items-center px-8  w-screen fixed bottom-0 h-20">
      <p className="">© 2024 3Squared. All rights reserved.</p>
      <div className="relative mx-auto">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={toggleDropup}
        >
          <span className=" flex font-semibold text-lg">
            {" "}
            <FiKey />
            Journey Legend
          </span>
          <FaAngleUp className={`transform ${dropupVisible && "rotate-180"}`} />
        </button>
        {dropupVisible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] overflow-y-auto py-2 bg-white text-gray-800 shadow-lg rounded-t-lg">
            <button
              className=" float-end mx-3 bg-gray-200 p-2 text-gray-700 rounded-full"
              onClick={() => setDropupVisible(false)}
            >
              {" "}
              <FaTimes className="w-3 h-3" />
            </button>
            <div className="p-4 space-y-4 ">
              <div className="flex items-center">
                <GoDash className="w-10 h-10 text-gray-800" />
                <span className="text-gray-700 text-lg ml-2 font-semibold">
                  Train Route
                </span>
              </div>
              <div className="flex">
                <GoDash className="w-10 h-10 text-green-600" />
                <span className="text-gray-800 text-lg ml-2 font-semibold">
                  Active Train
                </span>
              </div>
              <div className="flex">
                <GoDash className="w-10 h-10 text-red-600" />
                <span className="text-gray-800 text-lg ml-2 font-semibold">
                  Cancelled Train
                </span>
              </div>
              <div className="flex">
                <GoDash className="w-10 h-10 text-blue-600" />
                <span className="text-gray-800 text-lg ml-2 font-semibold ">
                  Terminated Train
                </span>
              </div>
              <div className="flex">
                <GoDash className="w-10 h-10 text-green-600" />
                <GoDash className="w-10 h-10 text-red-600" />
                <span className="text-gray-800 text-lg ml-2 font-semibold">
                  Enroute Cancellation
                </span>
              </div>
              <div className="flex">
                <img
                  src="./images/train-icon.png"
                  alt="Train Icon"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 text-lg ml-2 font-semibold">
                  Train Current Location
                </span>
              </div>
              <div className="flex">
                <img
                  src="./images/black dot.png"
                  alt="Black Dot"
                  className="w-7 h-7 ml-2 "
                />
                <span className="text-gray-800 text-lg ml-6 font-semibold">
                  Train Destination
                </span>
              </div>
              <div className="flex">
                <img
                  src="./images/black dot 2.png"
                  alt="Black Dot 2"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 text-lg ml-2 font-semibold">
                  Location Of Departure{" "}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
