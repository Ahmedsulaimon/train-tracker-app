import React from "react";
import LocationInfo from "./getLocationName";
import { useState } from "react";
const LocationName = () => {
  const [Latitude, SetLatitude] = useState(null);
  const [Longitude, SetLongitude] = useState(null);
  // Example latitude and longitude
  //   const latitude = 40.7128;
  //   const longitude = -74.006;
  if ("geolocation" in navigator) {
    // Geolocation is supported
    console.log("Geolocation is supported");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        SetLatitude(latitude);
        SetLongitude(longitude);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Use the obtained coordinates with Leaflet.js to show the user's location on the map
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
        }
      }
    );
  } else {
    // Geolocation is not supported
    console.log("Geolocation is not supported by your browser");
  }
  return (
    <div>
      <h1>Location Information</h1>
      <LocationInfo latitude={Latitude} longitude={Longitude} />
    </div>
  );
};

export default LocationName;
