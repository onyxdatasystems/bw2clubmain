import React, { useState } from "react";
import EditProfileInfo from "./EditProfileInfo"; // Import the modal component
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

const ProfileHeaderEdit = ({ editProfileOpen, setEditProfileOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sm:bg-white overflow-hidden sm:shadow-sm sm:rounded-xl">
      {/* Banner (top image) */}
      <div className="relative h-40 w-full bg-[url('src/components/images/banner.jpg')] bg-cover bg-center">
        {/* Edit banner icon (moved to bottom-right) */} 
        <button className="absolute bottom-2 right-2  text-white p-2 rounded-full">
        <img
              src="src/components/images/banner-edit.png"/>
        </button>
        {/* Mobile-only banner icons (hidden on desktop) */}
        <div className="sm:hidden flex justify-between items-center px-3 pt-2">
          <div>
            <button>
              <MdArrowBack className="text-white text-2xl" />
            </button>
          </div>
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

      {/* Content container */}
      <div className="relative px-6 pb-6">
        {/* MOBILE LAYOUT (<640px) */}
        <div className="flex flex-col gap-3 sm:hidden -mt-12">
          <div className="relative w-20 h-20">
            <img
              src="src/components/images/profile.jpg"
              alt="Ksenija Nikolova"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 text-white p-1 rounded-full">
              <img
                src="src/components/images/profile-edit.png"/>
            </button>
          </div>
          <div className="flex justify-between items-center w-full mt-1">
            <h1 className="text-[16px] font-semibold text-[#4E4E4E] text-center">
              Ksenija Nikolova
            </h1>
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#5D4AA7] text-xl">
              <img
              src="src/components/images/profile-edit-menu.png"/>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setEditProfileOpen(true); // Open Edit Profile modal
                      setMenuOpen(false); // Close menu
                    }}
                  >
                    Edit profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Share profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 text-[14px] text-[#4E4E4E] space-y-2">
            <p>Works as Founder at Better Women Better World</p>
            <p>
              Studied Bachelor of Arts in Tourism and Leisure Management at EU
              Business School Barcelona
            </p>
            <p>Born on August 2, 1988</p>
          </div>
          <div className="mt-3 flex items-center gap-4 text-[14px] text-[#4E4E4E]">
            <div className="flex items-center gap-1">
              <GiLeo className="text-[#5D4AA7]" />
              <span>Leo</span>
            </div>
            <div className="flex items-center gap-1">
              <FaGlobe className="text-[#5D4AA7]" />
              <span>English</span>
            </div>
          </div>
        </div>
        {/* Render EditProfileInfo modal when editProfileOpen is true */}
      {editProfileOpen && (
        <EditProfileInfo
          onClose={() => setEditProfileOpen(false)} // Close modal
          onSave={() => {
            console.log("Profile saved!"); 
            setEditProfileOpen(false); // Close after saving
          }}
        />
      )}

        {/* DESKTOP LAYOUT (≥640px) */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center -mt-12">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24">
                <img
                  src="src/components/images/profile.jpg"
                  alt="Ksenija Nikolova"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 text-white p-2 rounded-full">
                  <img
                  src="src/components/images/profile-edit.png"/>
                </button>
              </div>
            </div>
          </div>
          {/* Name & Menu */} 
          <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
            <h1 className="text-[18px] font-semibold text-[#4E4E4E]">
              Ksenija Nikolova
            </h1>
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#5D4AA7] text-xl">
                <img
              src="src/components/images/profile-edit-menu.png"/>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setEditProfileOpen(true); // Open Edit Profile modal
                      setMenuOpen(false); // Close menu
                    }}
                  >
                    Edit profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Share profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-[14px] text-[#4E4E4E]">
            <div className="flex items-start gap-2">
              <FaBriefcase className="text-[#5D4AA7] mt-[3px]" />
              <p>Works as Founder at Better Women Better World</p>
            </div>
            <div className="flex items-start gap-2">
              <FaGraduationCap className="text-[#5D4AA7] mt-[3px]" />
              <p>Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona</p>
            </div>            
            <div className="flex items-start gap-2">
              <FaBirthdayCake className="text-[#5D4AA7] mt-[3px]" />
              <p>Born on August 2, 1988</p>            
            </div>          
          </div>          
          <div className="mt-3 flex items-center gap-6 text-[14px] text-[#4E4E4E]">            
            <div className="flex items-center gap-2">              
              <GiLeo className="text-[#5D4AA7]" />              
              <span>Leo</span>           
            </div>            
            <div className="flex items-center gap-2">
              <FaGlobe className="text-[#5D4AA7]" />
              <span>English</span>            
            </div>          
          </div>        
        </div> 
        {/* Render EditProfileInfo modal when editProfileOpen is true */}
      {editProfileOpen && (
        <EditProfileInfo
          onClose={() => setEditProfileOpen(false)} // Close modal
          onSave={() => {
            console.log("Profile saved!"); 
            setEditProfileOpen(false); // Close after saving
          }}
        />
      )}     
      </div>    
    </div>  
  );
};
export default ProfileHeaderEdit;