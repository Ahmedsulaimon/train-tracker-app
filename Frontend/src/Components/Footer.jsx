import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { FiKey } from "react-icons/fi";

const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <footer className="bg-gray-800 w-screen fixed bottom-0 h-20">
      <div className="flex justify-between items-center px-8 h-full">
        <div className="flex justify-center items-center flex-grow">
          <button
            className="text-white cursor-pointer font-semibold text-lg flex"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onClick={toggleModal}
          >
            <FiKey /> Journey Legend
          </button>
        </div>
        <p className="text-white">© 2024 3Squared. All rights reserved.</p>
      </div>

      {modalVisible && (
        <div
          id="default-modal"
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full">
            <div className="absolute top-0 right-0 p-4">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={toggleModal}
              >
                <FaTimes className="w-3 h-3" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GoDash color="grey" className="w-10 h-10" />
                <span className="text-gray-800 text-lg ml-2">Train Route</span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GoDash color="blue" className="w-10 h-10" />
                <span className="text-gray-800 text-lg ml-2">Active Train</span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GoDash color="red" className="w-10 h-10" />
                <span className="text-gray-800 text-lg ml-2">
                  Cancelled Train
                </span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GoDash color="green" className="w-10 h-10" />
                <span className="text-gray-800 text-lg ml-2">
                  Terminated Train
                </span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GoDash color="blue" className="w-10 h-10" />{" "}
                <GoDash color="red" className="w-10 h-10" />
                <span className="text-gray-800 text-lg ml-2">
                  Enroute Cancellation
                </span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="./images/train-icon.png"
                  alt="Train Icon"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 text-lg ml-2">
                  Train Current Location
                </span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="./images/black dot.png"
                  alt="Black Dot"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 text-lg ml-2">
                  Train Destination
                </span>
              </div>
              <div
                className="legend-item mr-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="./images/black dot 2.png"
                  alt="Black Dot 2"
                  className="w-10 h-10"
                />
                <span className="text-gray-800 text-lg ml-2">
                  Train Departure Location
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
