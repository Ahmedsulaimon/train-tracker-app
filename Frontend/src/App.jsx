import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { FaTrainSubway } from "react-icons/fa6";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import Navbar from "./Components/Navbar";
import "./App.css";
import { isBefore, isAfter, parseISO } from "date-fns";
import Timeline from "./Timeline";
import Button from "./Components/Button";
import { FaArrowRight } from "react-icons/fa";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");

    socket.on("dataUpdate", (newData) => {
      setData(newData);
    });

    socket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const currentDateTime = new Date();

  const mapContainerStyle = {
    width: "88%",
    height: "100%",
    border: "6px solid #ccc",
    borderRadius: "26px",
  };

  return (
    <>
      <Navbar />
      <Button />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="text-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            marginTop: "20px",
          }}
        >
          <div style={mapContainerStyle}>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={9}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data &&
                data.processedTrainMovement &&
                data.ids &&
                data.processedTrainMovement.map((trainMovements, index) => {
                  const trainInfo = data.ids[index];
                  if (!trainInfo) return null; // This check might be redundant, adjust based on your data structure

                  const scheduledDeparture = parseISO(
                    trainInfo.scheduledDeparture
                  );
                  const scheduledArrival = parseISO(trainInfo.scheduledArrival);

                  let color = "blue"; // Default for currently running trains

                  if (trainInfo.cancelled) {
                    color = "red"; // Train is cancelled
                  } else if (isBefore(currentDateTime, scheduledDeparture)) {
                    return null; // Do not render if departure is in the future
                  } else if (isAfter(currentDateTime, scheduledArrival)) {
                    color = "green"; // Train has already run
                  } // No need for an else statement for the running train condition, as it's the default

                  const validMovements = trainMovements.filter(
                    (movement) => movement.latLong
                  );

                  const validLocation = trainMovements.filter(
                    (loc) => loc.location
                  );

                  const lastMovement =
                    validMovements[validMovements.length - 1];

                  return (
                    <React.Fragment key={index}>
                      <Polyline
                        pathOptions={{ color }}
                        positions={validMovements.map((movement) => [
                          movement.latLong.latitude,
                          movement.latLong.longitude,
                        ])}
                      />
                      {lastMovement && trainInfo != null && (
                        <Marker
                          position={[
                            lastMovement.latLong.latitude,
                            lastMovement.latLong.longitude,
                          ]}
                        >
                          <Popup className="w-[550px] ">
                            <div className="flex  flex-wrap bg-gray-700 p-2 w-[500px] leading-6">
                              <div className=" text-white mt-1">
                                <div className=" flex">
                                  <span className="font-semibold text-base tracking-tight mr-3 text-blue-400">
                                    Operating Company (s):
                                  </span>
                                  {trainInfo.toc_Name.map((toc, index) => (
                                    <h3
                                      className=" mr-2 font-bold text-gray-200  "
                                      key={index}
                                    >
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

                            {/* <Timeline
                              className="p-6"
                              location={trainMovements.location}
                              eventTypes={trainMovements.eventTypes}
                            /> */}
                            <div className="overflow-y-auto touch-pan-y h-80 w-[500px] experience leading-8">
                              <VerticalTimeline lineColor="#000">
                                {trainMovements.map(
                                  (movement, movementIndex) => (
                                    <VerticalTimelineElement
                                      key={movementIndex}
                                      className="vertical-timeline-element--education"
                                      iconStyle={{
                                        background: "#000",
                                        color: "#fff",
                                      }}
                                      icon={<FaTrainSubway />}
                                      date={
                                        <div className="flex">
                                          <span className="">
                                            <h className=" font-semibold text-sm text-blue-500">
                                              Expected Departure Time:
                                            </h>
                                            {movement.plannedDeparture
                                              ? new Date(
                                                  movement.plannedDeparture
                                                ).toLocaleTimeString()
                                              : "--"}
                                          </span>
                                        </div>
                                      }
                                    >
                                      <h3
                                        style={{
                                          fontSize: "larger",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {movement.location}
                                      </h3>
                                      <div className="flex">
                                        <h className="mr-2 mt-4 font-semibold text-sm text-blue-400">
                                          EventType(s):
                                        </h>
                                        {movement.eventTypes &&
                                          movement.eventTypes.map(
                                            (e, eventTypeIndex) => (
                                              <div className="">
                                                <p
                                                  key={eventTypeIndex}
                                                  className=" flex "
                                                >
                                                  {e}
                                                  {movement.eventTypes.length >
                                                    1 && (
                                                    <FaArrowRight className=" m-1 text-blue-600" />
                                                  )}
                                                </p>
                                              </div>
                                            )
                                          )}
                                      </div>
                                    </VerticalTimelineElement>
                                  )
                                )}
                              </VerticalTimeline>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </React.Fragment>
                  );
                })}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
