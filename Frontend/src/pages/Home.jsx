import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SidebarLeft from "../Components/SidebarLeft";
import SidebarRight from "../Components/SidebarRight";
import Timeline from "../Components/Timeline";
import LocationName from "../Components/getUserLocation/getCoordinate";
import LocationMarker from "../Components/UpdatePosition";
import SearchBar from "../Components/Searchbar";
import TiplocData from "../data/tiplocs.json";
function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [isSidebarLeftOpen, setIsSidebarLeftOpen] = useState(false);
  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState(false);
  const [trainMovements, setTrainMovement] = useState(null);
  const [location, setLocation] = useState({ lat: 53.79648, lng: -1.54785 });
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

  const toggleSidebarLeft = () => {
    setIsSidebarLeftOpen(!isSidebarLeftOpen);
  };

  const toggleSidebarRight = () => {
    setIsSidebarRightOpen(!isSidebarRightOpen);
  };

  const closeSidebar = () => {
    setIsSidebarLeftOpen(false);
    setIsSidebarRightOpen(false);
  };
  const moveToLocation = (lat, lng) => {
    setLocation({ lat, lng });
  };
  const openBothSideBars = (open) => {
    setIsSidebarLeftOpen(open);
    setIsSidebarRightOpen(open);
  };

  const currentDateTime = new Date();

  const mapContainerStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <SidebarLeft
        isOpen={isSidebarLeftOpen}
        closeSidebar={closeSidebar}
        data={data}
        handleJourneySelect={handleJourneySelect}
      />
      {data &&
        data.allTrainSchedule &&
        data.ids &&
        data.processedTrainMovement &&
        data.allTrainSchedule.map((trainMovements, index) => {
          const trainInfo = data.ids[index];

          if (!trainInfo) return null;

          return (
            <React.Fragment key={index}>
              {selectedJourney === index && (
                <SidebarRight
                  isOpen={isSidebarRightOpen}
                  closeSidebar={closeSidebar}
                  trainMovements={trainMovements}
                  trainInfo={trainInfo}
                />
              )}
            </React.Fragment>
          );
        })}
      <Navbar
        toggleSidebarLeft={toggleSidebarLeft}
        toggleSidebarRight={toggleSidebarRight}
      />
      <SearchBar
        data={TiplocData}
        moveToLocation={moveToLocation}
        openSideBars={openBothSideBars}
      />
      <div className="text-center">
        <div
          style={{
            position: "absolute",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <div style={mapContainerStyle}>
              <MapContainer
                center={location}
                zoom={8}
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
                          <>
                            <Marker
                              position={[
                                lastMovement.latLong.latitude,
                                lastMovement.latLong.longitude,
                              ]}
                            >
                              {/* <Timeline
                              className="p-6"
                              trainMovements={trainMovements}
                            /> */}
                              {/* <Popup className="w-[550px] ">
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
                            </Popup> */}
                            </Marker>
                            {/* <SidebarRight
                              isOpen={isSidebarRightOpen}
                              closeSidebar={closeSidebar}
                              trainMovements={trainMovements}
                              trainInfo={trainInfo}
                            /> */}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                <LocationMarker lat={location.lat} lng={location.lng} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
