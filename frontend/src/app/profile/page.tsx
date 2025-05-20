"use client";
import React from "react";
<<<<<<< HEAD


import Navbar from "../Navbar/page";

import ProfileSection_ProfilePosts from "./ProfileSection_ProfilePosts";
import Ads from "./Ads";
 const Layout=()=>{
    return (
      <div className="flex flex-col h-screen w-full bg-gray-100 relative">
        <Navbar />
        
       
          
          <main className="flex flex-col flex-1 overflow-y-auto p-2 md:p-4">
            <ProfileSection_ProfilePosts  />
          </main>

          <div className="hidden lg:block lg:w-1/5 overflow-y-auto">
            <Ads />
          </div>
     
      </div>
    );
  }


export default Layout;
=======
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page"; // Fixed import
import ProfileSection_ProfilePosts from "./ProfileSection_ProfilePosts";
import Ads from "./Ads";

interface LayoutState {
  isSideNavVisible: boolean;
}

class Layout extends React.Component<{}, LayoutState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isSideNavVisible: false,
    };
  }

  toggleSideNav = () => {
    this.setState((prevState) => ({ isSideNavVisible: !prevState.isSideNavVisible }));
  };

  render() {
    const { isSideNavVisible } = this.state;

    return (
      <div className="flex flex-col h-screen w-full bg-gray-100 relative">
        <Navbar />

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
          onClick={this.toggleSideNav}
        >
          <Image
            src={isSideNavVisible ? "/icons/close-icon.png" : "/icons/menu-icon.png"}
            alt="Toggle Sidebar"
            width={24}
            height={24}
          />
        </button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSideNavVisible && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={this.toggleSideNav}
              />
              <motion.div
                className="fixed top-0 left-0 z-50"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <SideBar className="w-64 h-full" size="sm" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="flex flex-row flex-grow overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Permanent Sidebar for Medium and Larger Devices */}
          <div className="hidden md:block w-0 md:w-1/5 lg:w-1/6">
            <SideBar size="md" />
          </div>

          <main className="flex flex-col flex-grow p-2 md:p-4 overflow-y-auto">
            <ProfileSection_ProfilePosts className="w-full" />
          </main>

          <div className="hidden lg:block w-0 lg:w-1/5">
            <Ads />
          </div>
        </motion.div>
      </div>
    );
  }
}

export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
