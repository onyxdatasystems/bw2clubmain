"use client"
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  icon: string;
  text: string;
  onClick?: () => void;
}

class ProfileDropdown extends React.Component<{}, { isOpen: boolean }> {
  state = {
    isOpen: false
  };

  private menuItems: MenuItem[] = [
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/profile-2.png',
      text: 'Profile',
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/suit-clu-2.png',
      text: 'Support bond requests',
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/search-2-2.png',
      text: 'Explore BW2CLUB',
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/setting-2.png',
      text: 'Settings & Privacy',
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/delete-r-2.png',
      text: 'Delete Account',
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/logout-s-2.png',
      text: 'Log out',
    },
  ];

  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleItemClick = (item: MenuItem) => {
    this.setState({ isOpen: false });
    if (item.onClick) {
      item.onClick();
    }
  };

  render() {
    return (
      <div className="relative w-full max-w-xs">
        <motion.button
          onClick={this.toggleDropdown}
          className="flex items-center gap-3 p-3 w-full hover:bg-gray-50 rounded-lg transition-colors"
          whileHover={{ backgroundColor: '#f9fafb' }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/profile-2.png"
            alt="Profile"
            width={22}
            height={22}
          />
          <span className="font-semibold text-sm text-gray-900">Profile</span>
          <motion.div
            animate={{ rotate: this.state.isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/frame-48.png"
              alt="Dropdown"
              width={10}
              height={6}
            />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {this.state.isOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50 mt-1"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                height: 'auto'
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                height: 0
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <div className="py-1">
                {this.menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => this.handleItemClick(item)}
                  >
                    <Image
                      src={item.icon}
                      alt={item.text}
                      width={18}
                      height={18}
                      className="opacity-70"
                    />
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default ProfileDropdown;