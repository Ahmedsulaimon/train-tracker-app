import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import socketIOClient from "socket.io-client";

const SearchBar = ({
  data,
  moveToLocation,
  openSideBars,
  resetSelectedJourneyIndex,
  resetData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTiploc, setSelectedTiploc] = useState("");

  // Debounced search handler
  const handleSearch = debounce((query) => {
    if (!query) {
      setFilteredResults([]);
      return;
    }

    const results = data.Tiplocs.filter(
      (item) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Tiploc.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredResults(results);
  }, 300);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");

    socket.emit("tiplocSelected", { tiploc: selectedTiploc });

    socket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedTiploc]);

  return (
    <div className="relative">
      <form>
        <input
          type="text"
          placeholder="Search by location or TIPLOC..."
          className="w-80 p-3 mr-16 border-2 border-r-white rounded-lg border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {filteredResults.length > 0 && (
        <div className="absolute top-full mt-1 bg-white shadow-lg rounded-md z-10 overflow-y-auto max-h-40">
          {filteredResults.map((result) => (
            <button
              key={result.Tiploc}
              aria-label="searched location"
              onClick={() => {
                setSelectedTiploc(result.Tiploc);
                setSearchQuery("");
                moveToLocation(result.Latitude, result.Longitude);
                setTimeout(() => {
                  openSideBars(true);
                }, 2000);
                resetSelectedJourneyIndex(0);
                resetData(null);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {result.DisplayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
