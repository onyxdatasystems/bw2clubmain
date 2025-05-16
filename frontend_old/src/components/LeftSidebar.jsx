import React from "react";
/* 
   Install react-icons if needed:
   npm install react-icons
*/
import { BiFemaleSign } from "react-icons/bi"; // For "HerPower"
import { FaUsers, FaTrophy, FaLightbulb, FaGlobeAmericas } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

const LeftSidebar = () => {
  return (
    <div className="w-64 bg-[#FFF2F966] rounded-xl shadow-sm py-10 px-7 h-[500px]">
      <ul className="flex flex-col gap-8 text-[14px] text-[#4E4E4E] font-normal">
        {/* HerPower */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <BiFemaleSign className="text-lg" />
          <span>HerPower</span>
        </li>

        {/* Thematic Groups */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <FaUsers className="text-lg" />
          <span>Thematic Groups</span>
        </li>

        {/* Events */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <BsCalendar3 className="text-lg" />
          <span>Events</span>
        </li>

        {/* Competitions */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <FaTrophy className="text-lg" />
          <span>Competitions</span>
        </li>

        {/* Initiatives */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <FaLightbulb className="text-lg" />
          <span>Initiatives</span>
        </li>

        {/* EmpowerSphere */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <FaGlobeAmericas className="text-lg" />
          <span>EmpowerSphere</span>
        </li>

        {/* Settings & Privacy */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-[#5D4AA7]">
          <AiOutlineSetting className="text-lg" />
          <span>Settings &amp; Privacy</span>
        </li>
      </ul>
    </div>
  );
};

