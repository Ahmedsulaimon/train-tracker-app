import React, { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function LocationMarker({ lat, lng }) {
  const [position, setPosition] = useState(lat && lng ? { lat, lng } : null);
  const map = useMap();

  // Function to update position and map view
  const updatePosition = (newLat, newLng) => {
    const newPosition = { lat: newLat + 0.04, lng: newLng };
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
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
