import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import TiplocData from "../data/tiplocs.json";
import SearchBar from "../Components/Searchbar";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import Navbar from "../Components/Navbar";
import Timeline from "../Components/Timeline";
import LocationName from "../Components/getUserLocation/getCoordinate";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(0);
  console.log(error);
  console.log(data);

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

  const handleJourneySelect = (journeyId) => {
    setSelectedJourney(journeyId);
  };

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
      <SearchBar data={TiplocData} />
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
          <div style={{ width: "100%", height: "100%" }}>
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
                    const scheduledArrival = new Date(
                      trainInfo.scheduledArrival
                    );
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

            <div style={mapContainerStyle}>
              <MapContainer
                center={[53.79648, -1.54785]}
                zoom={9}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data &&
                  data.allTrainSchedule &&
                  data.ids &&
                  data.processedTrainMovement &&
                  data.allTrainSchedule.map((trainMovements, index) => {
                    const trainInfo = data.ids[index];

                    if (!trainInfo) return null;

                    const scheduledDeparture = new Date(
                      trainInfo.scheduledDeparture
                    );
                    const scheduledArrival = new Date(
                      trainInfo.scheduledArrival
                    );

                    let color = "blue";

                    if (trainInfo.cancelled) {
                      color = "red";
                    } else if (currentDateTime < scheduledDeparture) {
                      return null;
                    } else if (currentDateTime > scheduledArrival) {
                      color = "green";
                    }

                    const validMovements = trainMovements.filter(
                      (movement) => movement.latLong
                    );

                    const lastMovement =
                      validMovements[validMovements.length - 1];

                    return (
                      <React.Fragment key={index}>
                        {selectedJourney === index && (
                          <Polyline
                            pathOptions={{ color }}
                            positions={validMovements.map((movement) => [
                              movement.latLong.latitude,
                              movement.latLong.longitude,
                            ])}
                          />
                        )}
                        {selectedJourney === index && lastMovement && (
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
                              <Timeline
                                className="p-6"
                                trainMovements={trainMovements}
                              />
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
      </div>
    </>
  );
}

export default Home;
