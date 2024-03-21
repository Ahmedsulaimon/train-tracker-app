import React from "react";
import { IoIosClose } from "react-icons/io";

const SidebarLeft = ({
  isOpen,
  closeSidebar,
  data,
  handleJourneySelect,
  selectedJourney,
}) => {
  const currentDateTime = new Date();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-100 transition duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button
          onClick={closeSidebar}
          aria-label="left sidebar"
          className="text-gray-500 focus:outline-none focus:text-gray-600"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content-inner overflow-y-auto h-screen pb-20">
          <div style={{ marginBottom: "10px" }}>
            {data ? (
              data.ids &&
              data.allTrainSchedule &&
              data.processedTrainMovement &&
              data.allTrainSchedule.length > 0 ? (
                data.allTrainSchedule.map((trainMovements, index) => {
                  const processedMovement = data.processedTrainMovement[index];
                  const trainInfo = data.ids[index];
                  const scheduledDeparture = new Date(
                    trainInfo.scheduledDeparture
                  );
                  const scheduledArrival = new Date(trainInfo.scheduledArrival);
                  let status = "Active";
                  if (
                    index === processedMovement &&
                    processedMovement.length > 0 &&
                    trainInfo.lastReportedType !== "TERMINATED"
                  ) {
                    status = "Active";
                  }

                  // Check if the train is cancelled, not started or terminated
                  if (trainInfo.cancelled) {
                    status = "Cancelled";
                  }
                  if (trainInfo.lastReportedType === "TERMINATED") {
                    status = "Terminated";
                  } else {
                    const scheduledTimePlusDelay = new Date(
                      scheduledDeparture.getTime() +
                        trainInfo.lastReportedDelay * 60000
                    );

                    if (
                      scheduledTimePlusDelay.getTime() >
                      currentDateTime.getTime()
                    ) {
                      status = "Not Started";
                    }
                  }

                  // Set status color based on status
                  let statusColor = "";
                  switch (status) {
                    case "Active":
                      statusColor = "text-blue-400";
                      break;
                    case "Cancelled":
                      statusColor = "text-red-400";
                      break;
                    case "Terminated":
                      statusColor = "text-green-300";
                      break;
                    default:
                      statusColor = "text-gray-400"; // Not Started remains white
                      break;
                  }

                  // Determine if the train is delayed, early, or on time
                  let delayTag = null;
                  if (
                    trainInfo.lastReportedDelay !== 0 &&
                    status !== "Terminated" &&
                    status !== "Cancelled"
                  ) {
                    delayTag = (
                      <span
                        className={
                          trainInfo.lastReportedDelay > 0
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {trainInfo.lastReportedDelay > 0 ? "Delayed" : "Early"}
                      </span>
                    );
                  }

                  return (
                    <button
                      key={index}
                      aria-label="train journey"
                      onClick={() => handleJourneySelect(index)}
                      className={
                        selectedJourney === index
                          ? "bg-gray-700 text-white font-semibold m-2 rounded-xl p-1 relative ring-4 ring-blue-400"
                          : "bg-gray-700 text-white font-semibold m-2 rounded-xl p-1 relative :"
                      }
                    >
                      {delayTag && (
                        <p className="mr-1 text-end text-sm font-semibold text-gray-400">
                          {trainInfo.lastReportedDelay} min(s) ({delayTag})
                        </p>
                      )}
                      {trainInfo.originLocation}{" "}
                      <span className=" text-gray-400">to</span>{" "}
                      {trainInfo.destinationLocation} -{" "}
                      <span className={statusColor}>{status}</span>
                    </button>
                  );
                })
              ) : data === null ? (
                <p className="text-lg text-center pt-60">Loading...</p>
              ) : (
                <p className="text-lg text-gray-400 font-bold text-center pt-40 px-4">
                  No Freight Train Operating In This Location
                </p>
              )
            ) : (
              <p className="text-lg text-center pt-60 font-bold">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
