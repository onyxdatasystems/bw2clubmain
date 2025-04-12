import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithAbout: React.FC = () => {
  const description = "Better Women Better World is a startup dedicated to empowering women and girls from different backgrounds and cultures. At Better Women Better World, we believe in the power of collaboration and community to drive positive change. BW2CLUB, our flagship project, is a diverse digital platform and mobile app designed to support and connect women and girls from around the world. Through BW2CLUB, women and girls can communicate, enjoy cultural exchange, participate in empowering events, embrace their creativity, generate meaningful bonds, and explore opportunities for growth and empowerment. BW2CLUB is a support network app designed to provide a safe and nurturing space for women and girls to feel safe, share their stories and struggles, and support one another. We have taken the essence of a community and given it a digital makeover. At its core, BW2CLUB stands for inclusivity, empowerment, and solidarity. Through this platform, we aim to break down barriers, foster a sense of community, and empower women to achieve their full potential. While we witness the positive impact of our work daily, we are also committed to creating a broader societal change through our dedicated campaigns and initiatives. Since our launch, which was in February this year, BW2CLUB has garnered significant traction, with over 370 users from more than 22 countries joining our community within just two months. All of this was achieved with zero budget for marketing, organically and through word of mouth.";

  const aboutItems = [
    {
      label: "Website",
      value: "www.growwr.co",
      icon: "globe-2.png"
    },
    {
      label: "Phone",
      value: "+15513090208",
      icon: "phone.png"
    },
    {
      label: "Employees",
      value: "10 Bonds are employees",
      icon: "users.png"
    }
  ];

  const employees = [
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-2.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-3.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-4.png"
  ];

  return (
    <BaseProfile
      name="Better Women Better World"
      role="Social Networking Platform"
      location="Mid, Delaware"
      establishedDate="Established on August 2, 2021"
      website="www.growwr.co"
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "About")}
      
      {/* About Content */}
      <motion.div 
        className="w-full bg-white rounded-lg border border-[#ebecef] p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.h2 
          className="text-[20px] font-medium text-[#3a3a3a] tracking-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Overview
        </motion.h2>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p 
            className="text-[14px] text-[#3a3a3a] tracking-tight leading-[160%] text-justify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {aboutItems.map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Image 
                    src={`https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/${item.icon}`}
                    alt={item.label}
                    width={16}
                    height={16}
                  />
                  <span className="text-[14px] font-medium text-[#3a3a3a]">
                    {item.label}
                  </span>
                </div>
                <p className="text-[14px] text-[#3a3a3a] pl-6">
                  {item.value}
                </p>
              </motion.div>
            ))}
            
            <motion.div
              className="flex -space-x-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {employees.map((employee, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, zIndex: 10 }}
                  className="relative w-9 h-9 rounded-full border-2 border-white"
                  style={{ zIndex: employees.length - index }}
                >
                  <Image 
                    src={employee}
                    alt={`Employee ${index + 1}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </motion.div>
              ))}
              <motion.div
                className="relative w-9 h-9 rounded-full bg-[#ebecef] flex items-center justify-center text-[10px] font-medium"
                whileHover={{ y: -5 }}
              >
                +7
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating action button for mobile */}
      <motion.div
        className="fixed bottom-6 right-6 md:hidden z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 1.2,
          type: "spring",
          stiffness: 500,
          damping: 15
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-br from-[#8585d5] to-[#6767b7] text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/edit.png" 
            alt="Edit profile" 
            width={24} 
            height={24} 
          />
        </motion.button>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithAbout;