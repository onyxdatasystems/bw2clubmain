"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

class NavItem {
  constructor(
    public href: string,
    public icon: string,
    public alt: string,
    public width: number,
    public height: number
  ) {}
}

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    new NavItem("/feed", "house-fi-6.png", "Home", 26, 26),
    new NavItem("/users", "users-fi-6.png", "Users", 26, 26),
    new NavItem("/jobs", "briefcas-12.png", "Jobs", 26, 26),
    new NavItem("/likes", "hand-hea-6.png", "Likes", 26, 26),
    new NavItem("/notifications", "bell-fil-6.png", "Notifications", 26, 26)
  ];

  return (
    <nav className="w-full h-[94px] bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/logo-6.png"
            alt="Logo"
            width={64}
            height={64}
            className="cursor-pointer"
          />
        </motion.div>
      </Link>

      {/* Search Bar - Hidden on mobile */}
      <motion.div 
        className="hidden md:flex flex-1 mx-4 md:mx-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 bg-[#f6f6f6] border border-[#ebecef] rounded-lg px-3 py-2 w-full max-w-md">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/search-1-6.png"
            alt="Search"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-sm text-[#898e9e] font-inter"
          />
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Image
          src={mobileMenuOpen ? 
            "https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/close-1-6.png" : 
            "https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/menu-1-6.png"}
          alt="Menu"
          width={24}
          height={24}
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-[94px] left-0 right-0 bg-white shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-2 bg-[#f6f6f6] border border-[#ebecef] rounded-lg px-3 py-2 mb-4">
                <Image
                  src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/search-1-6.png"
                  alt="Search"
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent w-full outline-none text-sm text-[#898e9e] font-inter"
                />
              </div>
              {navItems.map((item, index) => (
                <Link href={item.href} key={index}>
                  <motion.div 
                    className="flex items-center gap-4 p-3 border-b border-gray-100"
                    whileHover={{ backgroundColor: "#f6f6f6" }}
                  >
                    <Image
                      src={`https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/${item.icon}`}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                    />
                    <span>{item.alt}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        {navItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={`https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/${item.icon}`}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="cursor-pointer hover:opacity-80"
              />
            </motion.div>
          </Link>
        ))}

        {/* Profile Navigation */}
        <motion.div 
          className="flex items-center gap-2 p-1.5 cursor-pointer hover:bg-gray-50 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-i-6.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden lg:inline text-[#898e9e] text-sm">Me</span>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/frame-48-17.png"
            alt="Dropdown"
            width={11}
            height={7}
            className="hidden lg:inline"
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;