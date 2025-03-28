import React, { useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaBirthdayCake,
  FaGlobe,
  FaCommentDots,
  FaPaperPlane,
  FaEdit,
} from "react-icons/fa";
import { GiLeo } from "react-icons/gi";
import { MdArrowBack, MdMoreVert, MdSearch } from "react-icons/md";

const UserHeaderEdit = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sm:bg-white overflow-hidden sm:shadow-sm sm:rounded-xl">
      {/* Banner */}
      <div className="relative h-40 w-full bg-[url('src/components/images/banner.jpg')] bg-cover bg-center">
        {/* Edit banner icon */}
        <button className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full">
          <FaEdit className="text-lg" />
        </button>
        
        {/* Mobile-only banner icons */}
        <div className="sm:hidden flex justify-between items-center px-3 pt-2">
          <button>
            <MdArrowBack className="text-white text-2xl" />
          </button>
          <div className="flex items-center gap-3">
            <button>
              <MdSearch className="text-white text-2xl" />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <MdMoreVert className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative px-6 pb-6">
        {/* MOBILE LAYOUT */}
        <div className="flex flex-col gap-3 sm:hidden -mt-12">
          {/* Avatar */}
          <div className="relative w-20 h-20">
            <img
              src="src/components/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
            {/* Edit profile icon */}
            <button className="absolute bottom-0 right-0 bg-black/50 text-white p-1 rounded-full">
              <FaEdit className="text-sm" />
            </button>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center -mt-12">
            <div className="relative w-24 h-24">
              <img
                src="src/components/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
              {/* Edit profile icon */}
              <button className="absolute bottom-0 right-0 bg-black/50 text-white p-2 rounded-full">
                <FaEdit className="text-sm" />
              </button>
            </div>
            {/* Three-dot menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-600 text-2xl"
              >
                <MdMoreVert />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit profile</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Share profile</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeaderEdit;
