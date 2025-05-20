<<<<<<< HEAD
"use client";
import React from "react";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const allTabs = ["Gallery", "Support Bonds"];

export default function Tabs({
  activeTab,
  onTabChange,
  className = "",
}: TabsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {allTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
=======
"user client";
import React, { useState } from 'react';

interface TabsProps {
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('Support Bonds');
  
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'board', label: 'Board' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'support-bonds', label: 'Support Bonds' }
  ];

  return (
    <div className={`w-full min-w-[300px] h-[48px] bg-white rounded-lg border border-[#EBECEF] ${className}`}>
      <div className="flex flex-row gap-[30px] items-center justify-center h-full px-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => setActiveTab(tab.label)}
          >
            <span
              className={`text-sm font-medium ${
                activeTab === tab.label ? 'text-[#7171C1]' : 'text-[#B2B2B2]'
              }`}
            >
              {tab.label}
            </span>
            {activeTab === tab.label && (
              <div className="h-[2px] bg-[#7171C1] w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
