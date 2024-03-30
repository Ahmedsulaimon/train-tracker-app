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

import LocationMarker from "../Components/UpdatePosition";

import { Icon } from "leaflet";
function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [isSidebarLeftOpen, setIsSidebarLeftOpen] = useState(false);
  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState(false);

  const [location, setLocation] = useState({ lat: 53.79648, lng: -1.54785 });

  const destinationMarker = new Icon({
    iconUrl: "../../Images/black dot.png",
    iconSize: [12, 12],
  });
  const originMarker = new Icon({
    iconUrl: "../../Images/black dot 2.png",
    iconSize: [25, 25],
  });
  const trainMarker = new Icon({
    iconUrl: "../../Images/train-icon.png",
    iconSize: [30, 30],
  });

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
  const resetSelectedJourneyIndex = (reset) => {
    setSelectedJourney(reset);
  };
  const resetData = (reset) => {
    setData(reset);
  };

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
        selectedJourney={selectedJourney}
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
        moveToLocation={moveToLocation}
        openSideBars={openBothSideBars}
        resetSelectedJourneyIndex={resetSelectedJourneyIndex}
        resetData={resetData}
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

                    let color = "gray";

                    if (trainInfo.cancelled) {
                      color = "red";
                    }

                    const validMovements = trainMovements.filter(
                      (movement) => movement.latLong
                    );

                    const originStation = validMovements[0];

                    const destinationStation =
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
                        {selectedJourney === index &&
                          originStation &&
                          destinationStation && (
                            <>
                              <Marker
                                icon={destinationMarker}
                                position={[
                                  destinationStation.latLong.latitude,
                                  destinationStation.latLong.longitude,
                                ]}
                              >
                                <Popup>{destinationStation.location}</Popup>
                              </Marker>
                              <Marker
                                icon={originMarker}
                                position={[
                                  originStation.latLong.latitude,
                                  originStation.latLong.longitude,
                                ]}
                              >
                                <Popup>{originStation.location}</Popup>
                              </Marker>
                            </>
                          )}
                      </React.Fragment>
                    );
                  })}
                {data &&
                  data.processedTrainMovement &&
                  data.processedTrainMovement.map(
                    (processedMovement, index) => {
                      const trainInfo = data.ids[index];

                      if (!trainInfo) return null;

                      const validMovements = processedMovement.filter(
                        (movement) => movement.latLong
                      );
                      let color = "green";

                      if (trainInfo.cancelled) {
                        color = "red";
                      }
                      if (validMovements.length > 0 && trainInfo.cancelled) {
                        color = "green";
                      } else if (trainInfo.lastReportedType === "TERMINATED") {
                        color = "blue";
                      }

                      const lastProcessedMovement =
                        validMovements.length > 0
                          ? validMovements[validMovements.length - 1]
                          : null;
                      return (
                        <React.Fragment key={`processed-${index}`}>
                          {selectedJourney === index && (
                            <Polyline
                              pathOptions={{ color }}
                              positions={validMovements.map((movement) => [
                                movement.latLong.latitude,
                                movement.latLong.longitude,
                              ])}
                            />
                          )}
                          {selectedJourney === index &&
                            lastProcessedMovement && (
                              <Marker
                                position={[
                                  lastProcessedMovement.latLong.latitude,
                                  lastProcessedMovement.latLong.longitude,
                                ]}
                                icon={trainMarker}
                              >
                                <Popup>{lastProcessedMovement.location}</Popup>
                              </Marker>
                            )}
                        </React.Fragment>
                      );
                    }
                  )}
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
