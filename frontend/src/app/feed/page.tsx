"use client";
import { useState } from "react";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page";
import PostComposeBar from "./PostComposeBar";
import FeedPost from "./FeedPost";
import AdsSection from "./AdsSection";
import Image from "next/image";

const HomePage: React.FC = () => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSideNav}
      >
        <Image
          src={
            isSideNavVisible
              ? "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png"
              : "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png"
          }
          alt="Toggle Sidebar"
          width={24}
          height={24}
        />
      </button>

      {/* Main Layout */}
      <div className="flex flex-grow p-5 gap-5">
        {/* Sidebar - Hidden on Mobile */}
        <div className={`fixed md:relative z-50 ${isSideNavVisible ? "block" : "hidden md:block"} w-64`}>
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-grow gap-5">
          <PostComposeBar />
          <FeedPost
            userName="John Doe"
            timeAgo="30 min"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non."
            imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/image1.png"
            avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/avatar1.png"
          />
          <FeedPost
            userName="Jane Doe"
            timeAgo="1 hr"
            content="Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque."
            imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/image2.png"
            avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/avatar2.png"
          />
        </div>

        {/* Ads Section (Hidden on Small Screens) */}
        <div className="hidden lg:block w-1/4">
          <AdsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
