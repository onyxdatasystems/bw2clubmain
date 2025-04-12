import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import ProfileHeaderEdit from "../components/UserProfileEdit/ProfileHeaderEdit";
import ProfileTabs from "../components/UserProfileEdit/ProfileTabs";
import EditProfileInfo from "../components/UserProfileEdit/EditProfileInfo";
import BubbleAnimation from "../components/BubbleAnimation"; // Import Bubble Animation

const UserProfileEdit = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-cover bg-center z-[-2]" 
           style={{ backgroundImage: "url('/src/components/images/background2.png')" }}>
      </div>

      <div id="moving-background" className="absolute inset-0 bg-cover bg-center z-[-1]" 
           style={{ backgroundImage: "url('/src/components/images/background1.png')" }}>
      </div>

      <BubbleAnimation /> {/* Run GSAP animation only on background1 */}
      {/* Navbar: visible only on sm and up */}
      <div className="hidden sm:block">
        <Navbar />
      </div>

      <div className="flex justify-center mt-6">
        {/* Left Sidebar: visible only on md and up */}
        <div className="hidden md:block w-1/4 pr-4">
          <LeftSidebar />
        </div>

        {/* Main Profile Content */}
        {/* On mobile (default) there's no vertical spacing, on sm and up, space-y-3 applies */}
        <div className="w-full sm:w-3/5 lg:w-1/2 space-y-0 sm:space-y-3">
            <ProfileHeaderEdit 
            editProfileOpen={editProfileOpen} 
            setEditProfileOpen={setEditProfileOpen} 
          />

          {/* Hide ProfileTabs when editProfileOpen is true */}
          {!editProfileOpen && <ProfileTabs />}

          {editProfileOpen && (
            <EditProfileInfo
              onClose={() => setEditProfileOpen(false)}
              onSave={() => setEditProfileOpen(false)}
            />
          )}
        </div>

        {/* Right Sidebar: visible only on lg and up */}
        <div className="hidden lg:block w-1/4 pl-6">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
