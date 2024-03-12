import React from "react";
import { IoIosClose } from "react-icons/io";

const SidebarLeft = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button
          onClick={closeSidebar}
          className="text-gray-500 focus:outline-none focus:text-gray-600"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-5">
        <ul className="space-y-1">
            <li>
                <a className="text-black ml-4">Put journey breakdown here</a>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLeft;




