import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiFillHome, AiOutlineBell } from "react-icons/ai";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white shadow-sm">
      {/* Container: centers content and adds horizontal padding */}
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Left: Purple Circle Logo */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#5D4AA7] flex items-center justify-center">
            {/* Replace with your actual logo image */}
            <img
              src="src/components/images/login-logo.png"
              alt="BW2CLUB"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
        </div>

        {/* Center: Search Bar (hidden on small screens) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-64 lg:w-80">
            <FiSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-3xl bg-[#F5F5F5] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5D4AA7]"
            />
          </div>
        </div>

        {/* Right: Icons + User Profile */}
        <div className="flex items-center gap-10 ml-4">
          {/* Home */}
          <button className="text-gray-600 hover:text-gray-800">
            <AiFillHome size={20} />
          </button>
          {/* Groups */}
          <button className="text-gray-600 hover:text-gray-800">
            <FaUsers size={18} />
          </button>
          {/* Network (New Icon) */}
          <button className="text-gray-600 hover:text-gray-800">
            <FaUserFriends size={18} />
          </button>
          {/* Jobs */}
          <button className="text-gray-600 hover:text-gray-800">
            <BsBriefcaseFill size={18} />
          </button>
          {/* Notifications */}
          <button className="text-gray-600 hover:text-gray-800">
            <AiOutlineBell size={20} />
          </button>

          {/* Profile: Avatar + “Me” + Dropdown */}
          <div className="flex items-center gap-1 cursor-pointer">
            <img
              src="src/components/images/avatar.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 hidden sm:block">Me</span>
            <IoMdArrowDropdown className="text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

