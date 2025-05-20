<<<<<<< HEAD
// components/SocialFeedLayout.tsx
"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page"
import PostCompose from "./PostCompose";
import CommentsSection from "./CommentsSection";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";

const SocialFeedLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Top navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar (mobile + desktop) */}
        <Sidebar joinedGroups={[]} />

        {/* Main feed: offset by 16rem on md+ */}
        <main className="flex flex-col flex-grow p-4 md:ml-64">
          <PostCompose className="w-full mb-4" />
          <CommentsSection className="w-full" />
        </main>

        {/* Right panel: offset same sidebar width on md+ */}
        <aside className="hidden lg:block w-64 p-4 md:ml-64">
          <ProfileDropdown />
          <div className="mt-4">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/rectangl.png"
              alt="Ad"
              width={225}
              height={300}
              className="rounded-lg shadow-md"
            />
=======
"use client"
import React from 'react';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import PostCompose from './PostCompose';
import CommentsSection from './CommentsSection';
import ProfileDropdown from './ProfileDropdown';
import Image from 'next/image';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-auto min-h-screen bg-[#f5f5f5]">
      <Navbar />
      <div className="flex flex-grow">
        <SideBar className="w-1/5" />
        <main className="flex flex-col flex-grow p-4">
          <PostCompose className="w-full mb-4" />
          <CommentsSection className="w-full" />
        </main>
        <aside className="w-1/5 p-4">
          <ProfileDropdown />
          <div className="mt-4">
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/rectangl.png" alt="Ad" width={225} height={300} className="rounded-lg shadow-md" />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          </div>
        </aside>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SocialFeedLayout;
=======
export default Layout;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
