import React from "react";
import { IoIosClose } from "react-icons/io";
import Timeline from "./Timeline";

const SidebarRight = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-[400px] bg-white transition duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <button
          onClick={closeSidebar}
          className="text-gray-500 focus:outline-none focus:text-gray-600"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content-inner overflow-y-auto h-[970px]">
        <ul className="space-y-1">
        <li>
              <a className="text-black ml-4">Item 1</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 2</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 3</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 4</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 5</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 6</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 7</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 8</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 9</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 10</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 11</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 12</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 13</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 14</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 15</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 16</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 17</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 18</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 19</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 20</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 21</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 22</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 23</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 24</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 25</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 26</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 27</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 28</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 29</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 30</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 31</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 32</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 33</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 34</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 35</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 36</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 37</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 38</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 39</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 40</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 41</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 42</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 43</a>
            </li>
            <li>
              <a className="text-black ml-4">Item 44</a>
            </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default SidebarRight;
