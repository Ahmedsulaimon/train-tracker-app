import React, { useState } from 'react';
import { FaHockeyPuck, FaTimes } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { GoDash } from "react-icons/go";

const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <footer className="bg-gray-800 w-screen fixed bottom-0">
      <div className="flex justify-center items-center h-20 px-8 relative">
        <div className="flex items-center">
          <GiPathDistance color='white' className='w-6 h-6 mr-2 cursor-pointer' onClick={toggleModal} />
          <p className="text-white mr-10">Journey Legend: Click the icon for more information.</p>
        </div>
        <p className="text-white mr-16">© 2024 3Squared. All rights reserved.</p>

        {modalVisible && (
          <div id="default-modal" className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full">
              <div className="absolute top-0 right-0 p-4">
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center" onClick={toggleModal}>
                  <FaTimes className="w-3 h-3" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <GoDash color='grey' className='w-10 h-10' />
                  <span className="text-gray-800 text-lg ml-2">Train Route</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <GoDash color='blue' className='w-10 h-10' />
                  <span className="text-gray-800 text-lg ml-2">Active Train</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <GoDash color='red' className='w-10 h-10' />
                  <span className="text-gray-800 text-lg ml-2">Cancelled Train</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <GoDash color='green' className='w-10 h-10' />
                  <span className="text-gray-800 text-lg ml-2">Terminated Train</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <GoDash color='blue' className='w-10 h-10' /> <GoDash color='red' className='w-10 h-10'/>
                  <span className="text-gray-800 text-lg ml-2">Enroute Cancellation</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="./images/train-icon.png" className="w-10 h-10"></img>
                  <span className="text-gray-800 text-lg ml-2">Train Current Location</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="./images/black dot.png" className="w-10 h-10"></img>
                  <span className="text-gray-800 text-lg ml-2">Train Destination</span>
                </div>
                <div className="legend-item mr-4" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="./images/black dot 2.png" className="w-10 h-10"></img>
                  <span className="text-gray-800 text-lg ml-2">Train Departure Location</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;









