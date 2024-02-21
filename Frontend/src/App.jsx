import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { FaTrainSubway } from "react-icons/fa6";
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
     
      <div className="text-center">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", marginTop: "20px"}}>
        <div style={mapContainerStyle}>
       
        <MapContainer 
        center={[51.505, -0.09]} 
        zoom={11} 
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
            data.allTrainSchedule.map((trainMovements, index) => {
              const trainInfo = data.ids[index];
              if (!trainInfo) return null; // This check might be redundant, adjust based on your data structure

              const scheduledDeparture = parseISO(trainInfo.scheduledDeparture);
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
              const lastMovement = validMovements[validMovements.length - 1];

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
                      <Popup className="w-[550px]">
                      <nav className="flex items-center flex-wrap bg-gray-700 p-4 w-[500px]">
                  <div className="flex items-center flex-shrink-0 text-white">
                    <FaTrainSubway className="w-6 h-6 mr-1"/>
                    <span className="font-semibold text-xl tracking-tight">Previous Journeys</span>
                  </div>
                  </nav>
                        {/* {trainInfo.toc_Name.map((toc) => (
                          <h3>{toc}</h3>
                        ))} */}
                         <Timeline className="p-6"/>
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
  )
          }
export default App;

