"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

class ProfileBond {
  constructor(
    public name: string,
    public avatar: string
  ) {}
}

class ProfileSection_ProfilePosts extends React.Component<{ className?: string }> {
  private supportBonds: ProfileBond[] = [
    new ProfileBond('Alfredo Donin', 'https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-9.png'),
    new ProfileBond('Anika Ekstrom Bothman', 'https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-10.png'),
    // ... other bonds
  ];

  render() {
    return (
      <div className={`flex flex-col ${this.props.className}`}>
        {/* Profile Section */}
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] mb-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background Image */}
          <div className="w-full h-[121px] relative">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/rectangl-12.png"
              alt="Profile background"
              fill
              className="object-cover rounded-t-lg"
            />
          </div>

          {/* Profile Content */}
          <div className="px-4 pb-4 relative">
            {/* Avatar */}
            <motion.div 
              className="absolute -top-14 left-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-8.png"
                alt="Profile avatar"
                width={115}
                height={115}
                className="rounded-full border-4 border-white"
              />
            </motion.div>

            {/* Profile Info */}
            <div className="mt-16">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h1 className="text-[20px] font-semibold text-[#3a3a3a] tracking-tight">
                  Ksenija Nikolova
                </h1>
                <div className="flex gap-3 items-center flex-wrap">
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Support</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7171c1] text-[#7171c1] text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/paper-pl-8.png" alt="Message" width={16} height={16} />
                    <span>Buzz Me</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                  >
                    <Image src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/more-hor-6.png" alt="More" width={23} height={23} />
                  </motion.button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex flex-col gap-2.5 text-base text-[#292b32]">
                {this.renderDetailItem("graduati-6.png", "Works as Founder at Better Women Better World")}
                {this.renderDetailItem("briefcas-11.png", "Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona")}
                {this.renderDetailItem("cake-1-6.png", "Born on August 2, 1988", true)}
                <div className="flex flex-col md:flex-row md:gap-24">
                  {this.renderDetailItem("leo-svgr-6.png", "Leo", true)}
                  {this.renderDetailItem("globe-2-6.png", "English", true)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] p-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
            {this.renderTab("About")}
            {this.renderTab("Board")}
            {this.renderTab("Gallery")}
            {this.renderTab("Support Bonds", true)}
          </div>
        </motion.div>

        {/* Support Bonds List */}
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] divide-y divide-[#ebecef]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {this.supportBonds.map((bond, index) => (
            <motion.div 
              key={index}
              className="flex items-center px-4 py-4"
              whileHover={{ backgroundColor: "#f6f6f6" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-[40px] h-[40px] relative">
                <Image 
                  src={bond.avatar} 
                  alt={bond.name} 
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="flex-grow text-sm text-[#292b32] ml-4">{bond.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  private renderDetailItem(icon: string, text: string, muted = false) {
    return (
      <motion.div 
        className="flex items-center gap-2"
        whileHover={{ x: 5 }}
      >
        <Image 
          src={`https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/${icon}`} 
          alt="" 
          width={18} 
          height={18} 
        />
        <span className={muted ? "text-[#292b32b2]" : ""}>{text}</span>
      </motion.div>
    );
  }

  private renderTab(label: string, active = false) {
    return (
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <span className={`text-sm font-medium ${active ? 'text-[#7171C1]' : 'text-[#B2B2B2]'}`}>
          {label}
        </span>
        {active && (
          <motion.div 
            className="h-[2px] bg-[#7171C1] w-full"
            layoutId="underline"
          />
        )}
      </motion.div>
    );
  }
}

export default ProfileSection_ProfilePosts;