import React from "react";
import { IoIosClose } from "react-icons/io";
import Timeline from "./Timeline";

const SidebarRight = ({ isOpen, closeSidebar, trainMovements, trainInfo }) => {
  const scheduledDeparture = new Date(trainInfo.scheduledDeparture);
  const scheduledArrival = new Date(trainInfo.scheduledArrival);

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-[400px] bg-slate-100 transition duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button
          onClick={closeSidebar}
          className="text-gray-500 focus:outline-none focus:text-gray-600"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content-inner overflow-y-auto h-[970px]">
          <div className="flex  flex-wrap bg-gray-700 p-2  leading-6">
            <div className=" text-white mt-1">
              <div className=" flex">
                <span className="font-semibold text-base tracking-tight mr-3 text-blue-400">
                  Operating Company (s):
                </span>
                {trainInfo.toc_Name.map((toc, index) => (
                  <h3 className=" mr-2 font-bold text-gray-200  " key={index}>
                    {toc}.
                  </h3>
                ))}
              </div>
              <div className=" flex">
                <span className="font-semibold text-base tracking-tight mr-3 text-blue-400">
                  Train Journey:
                </span>
                <h3 className="font-bold text-gray-200">
                  {trainInfo.originLocation}
                  <span className="font-semibold text-sm tracking-tight mx-3 text-gray-500">
                    to
                  </span>
                  {trainInfo.destinationLocation}
                </h3>
              </div>
              <div>
                <div className="flex ">
                  <span className="font-semibold text-base tracking-tight mr-3 text-blue-400">
                    {" "}
                    Expected Departure Time:
                  </span>
                  <h3 className="font-bold text-gray-200 ">
                    {scheduledDeparture.toLocaleString()}
                  </h3>
                </div>
                <div className="flex">
                  <span className="font-semibold text-base tracking-tight mr-3 text-blue-400">
                    Expected Arrival Time:
                  </span>
                  <h3 className=" font-bold text-gray-200">
                    {scheduledArrival.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <Timeline trainMovements={trainMovements} />
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
