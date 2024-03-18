import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import socketIOClient from "socket.io-client";
const SearchBar = ({ data, moveToLocation, openSideBars }) => {
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
  }, 3000);

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
    <div>
      <form>
      <input
        type="text"
        placeholder="Search by location or TIPLOC..."
        className="w-full p-3 border-2 border-r-white rounded-lg border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
</form>
<div className="relative overflow-y-auto z-50 rounded-md h-4 px-56 text-center justify-center">
        <div className="fixed mr-80 bg-white align-middle py-6 px-40">
      <div>
        {filteredResults.map((result) => (
          <button
            key={result.Tiploc}
            onClick={() => {
              setSelectedTiploc(result.Tiploc);
              setSearchQuery("");
              moveToLocation(result.Latitude, result.Longitude);
              openSideBars(true);
            }}
            className=" mr-3"
          >
            {result.DisplayName},
          </button>
        ))}
      </div>
      {/* {selectedTiploc && <p>Selected TIPLOC: {selectedTiploc}</p>} */}
    </div>
  </div>
</div>
  );
};

export default SearchBar;
