
import React from "react";
import { BiMessageSquareDetail, BiRefresh } from "react-icons/bi";

const RightSidebar = () => {
  return (
    <div className="w-[280px] bg-gradient-to-b from-[#f6f3fc] to-[#fdeff2] rounded-xl shadow-sm p-4">
      {/* Heading */}
      <h3 className="text-[14px] font-medium text-[#4E4E4E] mb-3">
        Advertising
      </h3>

      {/* Ad Image/Card */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden mb-4">
        <img
          src="src/components/images/ad.png"
          alt="Dary Glam by UGON"
          className="w-full h-[180px] object-cover"
        />
      </div>

      {/* Icons row under the Ad image */}
      <div className="flex justify-around">
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
          <BiMessageSquareDetail className="text-[#5D4AA7]" size={20} />
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg">
          <BiRefresh className="text-[#5D4AA7]" size={20} />
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;

