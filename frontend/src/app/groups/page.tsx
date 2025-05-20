<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page";
import CreateThematicGroup from "./CreateThematicGroup";
import GroupProfile from "./thematicGroupCreated/GroupProfile";
import ThematicGroupList from "./ThematicGroupList";
import Modal from "./Modal";

const Layout: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-grow p-4 md:p-6 overflow-y-auto lg:ml-64">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div
              className="flex space-x-4 border-b border-gray-200 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {[
                { key: "groups", label: "All Groups" },
                { key: "create", label: "Create Group" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab.key
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "groups" ? (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <GroupProfile groupId="example-group-id" />
                  <ThematicGroupList />
                </motion.div>
              ) : (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <CreateThematicGroup />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
=======
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import CreateThematicGroup from './ThematicGroupList';
import GroupProfile from './thematicGroupCreated/GroupProfile'; 
import ThematicGroupList from './ThematicGroupList';

const Layout: React.FC = () => {
 
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    const fetchJoinedGroups = async () => {
      const response = await fetch('https://bw2club.onyxdatasystems.com/backend/api/v1/group/user/joined');
      const data = await response.json();
      setJoinedGroups(data);
    };
    fetchJoinedGroups();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa] relative">
      <Navbar />
      <GroupProfile groupId="example-group-id" />


    

      {/* Toggle button for small devices */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSideNav}
      >
        <Image
          src={
            isSideNavVisible
              ? 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png'
              : 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png'
          }
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
              onClick={toggleSideNav}
            />
            <motion.div
              className="fixed top-0 left-0 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <SideBar size="sm" className="w-64 h-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-row w-full h-full">
        {/* Permanent Sidebar for Medium and Larger Devices */}
        <div className="hidden md:block flex-none w-1/5 bg-[#fff2f9]">
          <SideBar size="md" />
        </div>
        <div className="flex-grow w-4/5 p-6">
          <CreateThematicGroup />
          <ThematicGroupList />
        </div>
      </div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
