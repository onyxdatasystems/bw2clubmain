
import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import PostComposer from "../components/HomeFeed/PostComposer";
import PostCard from "../components/HomeFeed/PostCard";
import RightSidebar from "../components/RightSidebar";

const HomeFeed = () => {
  return (
    <div className="min-h-screen bg-homefeed bg-cover bg-center">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Container with top padding to account for the fixed navbar */}
      <div className="pt-20">
        <div className="max-w-[1400px] mx-auto flex gap-6 relative">
          {/* Fixed Left Sidebar */}
          <div className="hidden lg:block">
            <div className="fixed top-20 left-8">
              <LeftSidebar />
            </div>
          </div>

          {/* Center Feed - scrollable */}
          <div className="flex-1 ml-0 lg:ml-[320px] mr-0 xl:mr-[320px]">
            <div className="flex flex-col gap-6 pb-6">
              <PostComposer />
              <PostCard />
              <PostCard />
              {/* Add more posts as needed */}
            </div>
          </div>

          {/* Fixed Right Sidebar */}
          <div className="hidden xl:block">
            <div className="fixed top-20 right-8">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;

