import React from 'react';
import { FaHockeyPuck } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 w-screen fixed bottom-0">
      <div className="flex justify-between items-center h-20 px-8">
        <div className="flex items-center">
          <p className="text-white">© 2024 3Squared. All rights reserved.</p>
        </div>

        <div className="flex items-center">
        <div className="legend-item mr-4">
            <GiPathDistance color='white' className='w-6 h-6'/>
            <span className="text-white ml-2">Journey Legend:</span>
          </div>
          <div className="legend-item mr-4">
          <FaHockeyPuck color='blue' className='w-6 h-6' />
            <span className="text-white ml-2">On Time</span>
          </div>
          <div className="legend-item mr-4">
          <FaHockeyPuck color='red' className='w-6 h-6' />
            <span className="text-white ml-2">Cancelled</span>
          </div>
          <div className="legend-item">
          <FaHockeyPuck color='green' className='w-6 h-6' />
            <span className="text-white ml-2">Early</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;