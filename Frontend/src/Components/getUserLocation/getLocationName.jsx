import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationInfo = ({ latitude, longitude }) => {
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
        );
        console.log(response.data.results);
        if (response.data.results.length > 0) {
          setLocationName(
            response.data.results[0].address_components[3].long_name
          );
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [latitude, longitude]);

  return (
    <div>
      <p>Location Name: {locationName}</p>
    </div>
  );
};

export default LocationInfo;
