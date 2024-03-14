import React from "react";
import { IoIosClose } from "react-icons/io";

const SidebarLeft = ({ isOpen, closeSidebar, data, handleJourneySelect }) => {
  const currentDateTime = new Date();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
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
          <div style={{ marginBottom: "10px" }}>
            {data ? (
              data.ids &&
              data.allTrainSchedule &&
              data.allTrainSchedule.length > 0 ? (
                data.allTrainSchedule.map((trainMovements, index) => {
                  const trainInfo = data.ids[index];
                  const scheduledDeparture = new Date(
                    trainInfo.scheduledDeparture
                  );
                  const scheduledArrival = new Date(trainInfo.scheduledArrival);
                  let status = "Active";

                  if (trainInfo.cancelled) {
                    status = "Cancelled";
                  } else if (currentDateTime < scheduledDeparture) {
                    status = "Not Started";
                  } else if (currentDateTime > scheduledArrival) {
                    status = "Terminated";
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => handleJourneySelect(index)}
                      className="bg-blue-600 text-white font-semibold m-3"
                    >
                      {trainInfo.originLocation} to{" "}
                      {trainInfo.destinationLocation} - {status}
                    </button>
                  );
                })
              ) : data === null ? (
                <p>Loading...</p>
              ) : (
                <p>Not found</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
