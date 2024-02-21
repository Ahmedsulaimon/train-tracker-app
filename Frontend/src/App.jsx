import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { FaTrainSubway } from "react-icons/fa6";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import Navbar from "./Components/Navbar";
import { FaBeer } from "react-icons/fa";
import Timeline from "./Timeline";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const multiPolyline = [
    [
      [51.5, -0.15],
      [51.5, -0.12],
      [51.52, -0.12],
    ],
    [
      [51.5, -0.05],
      [51.51, -0.06],
      [51.52, -0.06],
    ],
  ];

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

  const mapContainerStyle = {
    width: "88%",
    height: "100%",
    border: "6px solid #ccc",
    borderRadius: "26px",
  };

  return (
    <>
      <Navbar />
      <div>
        <button></button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "88vh" }}>
        <div style={mapContainerStyle}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.5, -0.15]}>
              <Popup className="w-[550px]">
                <nav className="flex items-center flex-wrap bg-gray-700 p-4 w-[500px]">
                  <div className="flex items-center flex-shrink-0 text-white">
                    <FaTrainSubway className="w-6 h-6 mr-1"/>
                    <span className="font-semibold text-xl tracking-tight">Previous Journeys</span>
                  </div>
                </nav>
                <Timeline className="p-6"/>
              </Popup>
            </Marker>
            <Polyline positions={multiPolyline} />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;

