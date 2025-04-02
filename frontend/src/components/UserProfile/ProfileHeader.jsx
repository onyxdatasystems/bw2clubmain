
import React from "react";
/* Icons used:
   - Desktop: FaBriefcase, FaGraduationCap, FaBirthdayCake, FaGlobe, FaCommentDots, GiLeo
   - Mobile: MdArrowBack, MdMoreVert, FaPaperPlane
*/
import {
  FaBriefcase,
  FaGraduationCap,
  FaBirthdayCake,
  FaGlobe,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import { GiLeo } from "react-icons/gi";
import { MdArrowBack, MdMoreVert, MdSearch } from "react-icons/md";

const ProfileHeader = () => {
  return (
    // For mobile, remove background; for desktop, use card style
    <div className="sm:bg-white overflow-hidden sm:shadow-sm sm:rounded-xl">
      {/* Banner (top image) */}
      <div className="relative h-40 w-full bg-[url('src/components/images/banner.jpg')] bg-cover bg-center">
        {/* Mobile-only banner icons (hidden on desktop) */}
        <div className="sm:hidden flex justify-between items-center px-3 pt-2">
          {/* Left: Go back icon */}
          <div>
            <button>
              <MdArrowBack className="text-white text-2xl" />
            </button>
          </div>
          {/* Right: Menu and Search icons */}
          <div className="flex items-center gap-3">
            <button>
              <MdSearch className="text-white text-2xl" />
            </button>
            <button>
              <MdMoreVert className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="relative px-6 pb-6">
        {/* MOBILE LAYOUT (default) */} 
        <div className="flex flex-col gap-3 sm:hidden -mt-12">
          {/* Avatar */} 
          <div className="w-20 h-20">
            <img
              src="src/components/images/profile.jpg"
              alt="Ksenija Nikolova"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
          {/* Name & Support Row */} 
          <div className="flex justify-between items-center w-full mt-1">
            <h1 className="text-[16px] font-semibold text-[#4E4E4E] text-center">
              Ksenija Nikolova
            </h1>
            <div className="flex items-center gap-2">
              <FaPaperPlane className="text-[#5D4AA7] text-lg" />
              <button className="bg-[#5D4AA7] text-white text-xs font-medium px-3 py-2 rounded-full hover:bg-[#4e3e8f]">
                Support
              </button>
            </div>
          </div>
          {/* Details for Mobile */} 
          <div className="mt-2 text-[14px] text-[#4E4E4E] space-y-2">
            <p>Works as Founder at Better Women Better World</p>
            <p>
              Studied Bachelor of Arts in Tourism and Leisure Management at EU
              Business School Barcelona
            </p>
            <p>Born on August 2, 1988</p>
          </div>
          {/* Bottom row (Leo & English) for Mobile */} 
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

        {/* DESKTOP LAYOUT (≥640px) */} 
        <div className="hidden sm:block">
          {/* Top Row: Avatar */} 
          <div className="flex flex-col sm:flex-row sm:items-center justify-between -mt-12">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24">
                <img
                  src="src/components/images/profile.jpg"
                  alt="Ksenija Nikolova"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
          </div>
          {/* Name & Buttons Row */} 
          <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
            <h1 className="text-[18px] font-semibold text-[#4E4E4E]">
              Ksenija Nikolova
            </h1>
            <div className="flex items-center gap-3">
              <button className="bg-[#5D4AA7] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#4e3e8f]">
                Support
              </button>
              <button className="border border-[#5D4AA7] text-[#5D4AA7] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#f1ecfa] flex items-center gap-2">
                <FaCommentDots />
                Buzz Me
              </button>
            </div>
          </div>
          {/* Desktop Details List */} 
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
              <FaBirthdayCake className="text-[#5D4AA7] mt-[3px]"/>              
              <p>Born on August 2, 1988</p>           
            </div>        
          </div>         
          {/* Desktop Bottom Row (Leo & English) */} 
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
      </div>    
    </div>
  );
};
export default ProfileHeader;
