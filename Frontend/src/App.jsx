import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "./App.css";
import { isBefore, isAfter, parseISO } from "date-fns";

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

  return (
    <>
      <div>
        {error && <p>Error: {error}</p>}
        <h2>Received Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="text-center">
        <MapContainer center={[51.505, -0.09]} zoom={11} scrollWheelZoom={true}>
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
                      <Popup>
                        {trainInfo.toc_Name.map((toc) => (
                          <h3>{toc}</h3>
                        ))}
                      </Popup>
                    </Marker>
                  )}
                </React.Fragment>
              );
            })}
        </MapContainer>
      </div>
    </>
  );
}

export default App;
