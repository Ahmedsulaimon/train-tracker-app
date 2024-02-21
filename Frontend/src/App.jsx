import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { FaBeer } from "react-icons/fa";
import Timeline from "./Timeline";
import Button from "./Button";
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
  //const color = { color: "blue" };

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
  return (
    <>
    <Button />
      <div>
        {error && <p>Error: {error}</p>}
        <Timeline />
        <h2>Received Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="text-center">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.5, -0.15]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Polyline positions={multiPolyline} />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
