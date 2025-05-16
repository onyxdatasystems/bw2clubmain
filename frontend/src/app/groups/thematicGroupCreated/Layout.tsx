import React from 'react';
import Navbar from "../../Navbar/page";
import SideBar from "../../SideBar/page";
import GroupProfile from './GroupProfile';
import PostInput from './PostInput';
import Image from "next/image"

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa]">
      <Navbar />
      <div className="flex flex-row w-full h-full">
        <div className="flex-none w-1/5 bg-[#fff2f9]">
          <SideBar />
        </div>
        <div className="flex-grow w-4/5 p-6">
          <GroupProfile groupId="example-group-id" />
          <PostInput />
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/globe-1.png"
              alt="Empty Board"
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-gray-500">Your board is empty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
