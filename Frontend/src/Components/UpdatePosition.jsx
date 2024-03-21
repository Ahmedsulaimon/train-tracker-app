import React, { useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
export default function LocationMarker({ lat, lng }) {
  const [position, setPosition] = useState(lat && lng ? { lat, lng } : null);
  const map = useMap();
  const locationUpdateMarker = new Icon({
    iconUrl: "../Images/black dot 2.png",
    iconSize: [15, 15],
  });
  // Function to update position and map view
  const updatePosition = (newLat, newLng) => {
    const newPosition = { lat: newLat, lng: newLng };
    setPosition(newPosition);
    map.flyTo(newPosition, map.getZoom());
  };

  // Update position if props change
  React.useEffect(() => {
    if (lat && lng) {
      updatePosition(lat, lng);
    }
  }, [lat, lng]);

  return position === null ? null : (
    <Marker position={position} icon={locationUpdateMarker}></Marker>
  );
}
