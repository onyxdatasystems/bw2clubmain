"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: 'house-fi.png', alt: 'Home' },
    { icon: 'users-fi.png', alt: 'Users' },
    { icon: 'briefcas-2.png', alt: 'Briefcase' },
    { icon: 'hand-hea.png', alt: 'Heart' },
    { icon: 'bell-fil.png', alt: 'Notifications' }
  ];

  return (
    <motion.nav 
      className="w-full h-[94px] bg-white flex items-center px-5 border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center w-full">
        {/* Mobile Menu Button */}
        <motion.button 
          className="lg:hidden mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="mr-8">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/logo.png"
            alt="Logo"
            width={64}
            height={64}
          />
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-md px-3 py-2 w-[365px] h-[41px] mr-auto"
          whileFocus={{ scale: 1.02 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/search-1.png"
            alt="Search"
            width={24}
            height={23}
          />
          <input
            type="text"
            placeholder="Search"
            className="border-none bg-transparent ml-2 text-sm text-gray-500 w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Navigation Icons */}
        <div className="hidden md:flex gap-11 items-center mr-8">
          {navItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              <Image 
                src={`https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/${item.icon}`} 
                alt={item.alt} 
                width={26} 
                height={26} 
              />
            </motion.div>
          ))}
        </div>

        {/* Profile Section */}
        <motion.div 
          className="flex items-center gap-3 p-1.5 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/avatar-i.png"
            alt="Avatar"
            width={46}
            height={46}
            className="rounded-full"
          />
          <motion.span 
            className="text-gray-500 text-sm"
            whileHover={{ color: '#7171c1' }}
          >
            Me
          </motion.span>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/frame-48-2.png"
            alt="Dropdown"
            width={11}
            height={7}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;