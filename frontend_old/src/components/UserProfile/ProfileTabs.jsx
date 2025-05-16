import React, { useState } from "react";
import UserAbout from "./UserAbout";
import UserBoard from "./UserBoard";
import UserGallery from "./UserGallery";
import UserSupportBonds from "./UserSupportBonds";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("About");

  const tabs = ["About", "Board", "Gallery", "Support Bonds"];

  const renderContent = () => {
    switch (activeTab) {
      case "About":
        return <UserAbout />;
      case "Board":
        return <UserBoard />;
      case "Gallery":
        return <UserGallery />;
      case "Support Bonds":
        return <UserSupportBonds />;
      default:
        return <UserAbout />;
    }
  };

  return (
    <div>
      {/* Tabs Container */}
      <div className="sm:border sm:rounded-xl sm:p-3 sm:bg-white">
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-1 pb-2 transition-all duration-300 ${
                activeTab === tab ? "text-[#5D4AA7] font-semibold" : "hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5D4AA7]"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Content below tabs with no extra spacing on mobile, spacing on sm+ */}
      <div className="mt-0 sm:mt-4">{renderContent()}</div>
    </div>
  );
};

export default ProfileTabs;

