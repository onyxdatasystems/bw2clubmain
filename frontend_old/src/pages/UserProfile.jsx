
import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileTabs from "../components/UserProfile/ProfileTabs";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-homefeed">
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
          <ProfileHeader />
          <ProfileTabs />
        </div>

        {/* Right Sidebar: visible only on lg and up */}
        <div className="hidden lg:block w-1/4 pl-6">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

