<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import Image from "next/image";

type BaseProfileProps = {
  name: string;
  role: string;
  location: string;
  establishedDate: string;
  website: string;
  avatarUrl: string;
  backgroundUrl: string;
  children: (args: {
    renderTabs: () => React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }) => React.ReactNode;
};

const BaseProfile: React.FC<BaseProfileProps> = ({
  name,
  role,
  location,
  establishedDate,
  website,
  avatarUrl,
  backgroundUrl,
  children,
}) => {
  const tabs = ["About", "Board", "Gallery", "Circle Members"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const renderTabs = () => (
    <div className="mt-4 flex gap-4 overflow-x-auto border-b border-gray-200 px-4 py-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`whitespace-nowrap pb-2 text-sm font-medium ${
            activeTab === tab
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* — Header */}
      <div className="relative h-32 w-full">
        <Image
          src={backgroundUrl}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative -mt-12 flex items-center px-6">
        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={96}
            height={96}
            className="object-cover"
            priority
          />
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-sm text-gray-600">{role}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="px-6 pb-4">
        <p className="text-sm text-gray-500">{establishedDate}</p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:underline"
        >
          {website}
        </a>
      </div>

      {/* — Tabs + Content */}
      {children({ renderTabs, activeTab, setActiveTab })}
    </div>
  );
};

export default BaseProfile;
=======
// components/BaseProfile.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ProfileProps {
  name?: string;
  role?: string;
  location?: string;
  establishedDate?: string;
  website?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  children?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default class BaseProfile extends React.Component<ProfileProps> {
  renderHeader() {
    const { name, avatarUrl, backgroundUrl } = this.props;
    
    return (
      <motion.div 
        className="w-full h-[121px] relative rounded-t-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image 
          src={backgroundUrl || "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-11.png"}
          alt="Profile background"
          fill
          className="object-cover"
        />
        
        <motion.div 
          className="relative -mt-14"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Image 
            src={avatarUrl || "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-10.png"}
            alt="Profile avatar"
            width={115}
            height={115}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </motion.div>
        
        <motion.div 
          className="absolute top-4 right-4 flex gap-2"
          variants={itemVariants}
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 hover:bg-gray-100 rounded-full bg-white bg-opacity-80 shadow-md"
          >
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/edit-6.png" alt="Edit" width={23} height={23} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 hover:bg-gray-100 rounded-full bg-white bg-opacity-80 shadow-md"
          >
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/more-hor-6.png" alt="More" width={23} height={23} />
          </motion.button>
        </motion.div>
        
        <motion.h1 
          className="text-[20px] font-semibold text-[#3a3a3a] mt-6"
          variants={itemVariants}
        >
          {name || "Better Women Better World"}
        </motion.h1>
      </motion.div>
    );
  }

  renderInfo() {
    const { role, location, establishedDate, website } = this.props;
    
    return (
      <motion.div 
        className="mt-8 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/graduati-6.png" alt="Role" width={18} height={18} />
          <span className="text-[16px] text-[#292b32]">{role || "Social Networking Platform"}</span>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/briefcas-11.png" alt="Location" width={18} height={18} />
          <span className="text-[16px] text-[#292b32b2]">{location || "Mid, Delaware"}</span>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/bookmark-6.png" alt="Established" width={18} height={18} />
          <span className="text-[16px] text-[#292b32b2]">{establishedDate || "Established on August 2, 2021"}</span>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/globe-2-6.png" alt="Website" width={18} height={18} />
          <span className="text-[16px] text-[#7171c1] hover:underline cursor-pointer">
            {website || "Visit website"}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  renderViewCircleButton() {
    return (
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0px 4px 15px rgba(103, 103, 183, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 px-4 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm font-medium shadow-md"
      >
        View Circle
      </motion.button>
    );
  }

  renderTabs(activeTab: string) {
    const tabs = ["About", "Board", "Gallery", "Circle Members"];
    
    return (
      <motion.div 
        className="mt-4 border border-[#ebecef] rounded-lg bg-white overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex px-4 py-3 gap-4 md:gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap text-[14px] ${
                tab === activeTab 
                  ? "text-[#7171c1] border-b-2 border-[#7171c1]" 
                  : "text-[#b2b2b2] hover:text-[#7171c1]"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  render() {
    return (
      <motion.div 
        className="flex flex-col min-w-[300px] md:min-w-[542px] h-auto bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <div className="w-full bg-white rounded-lg p-6">
          {this.renderHeader()}
          {this.renderInfo()}
          {this.renderViewCircleButton()}
        </div>
        {this.props.children}
      </motion.div>
    );
  }
}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
