// src/components/Navbar.tsx
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Animations } from '../../config/AppConfig';

interface NavItem {
  icon: string;
  path: string;
  alt: string;
  };
export  default function Navbar(){
  const navItems: NavItem[] = [
    { icon: 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/house-fi.png', path: '/feed', alt: 'Home' },
    { icon: 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/users-fi.png', path: '/users', alt: 'Users' },
    { icon: 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/briefcas.png', path: '/briefcase', alt: 'Briefcase' },
    { icon: 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/hand-hea.png', path: '/heart', alt: 'Heart' },
    { icon: 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/bell-fil.png', path: '/notifications', alt: 'Notifications' }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  exit: { x: '100%' }
};


  return (
      <>
        <motion.nav
          className="w-full h-[94px] bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          variants={navVariants}
        >
          {/* Logo and mobile menu button */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={Animations.hover}
              whileTap={Animations.tap}
              className="flex-shrink-0"
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/logo.png"
                alt="Logo"
                width={64}
                height={64}
                priority
              />
            </motion.div>

            <motion.button
              className="md:hidden p-2"
              whileHover={Animations.hover}
              whileTap={Animations.tap}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image
                src={isMobileMenuOpen ? 
                  "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png" : 
                  "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png"}
                alt="Menu"
                width={24}
                height={24}
              />
            </motion.button>
          </div>

          {/* Desktop navigation */}
          <motion.div
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navItems.map((item) => (
              <Link key={item.alt} href={item.path}>
                <Image src={item.icon} alt={item.alt} width={26} height={26} />
              </Link>
            ))}
          </motion.div>

          {/* Profile section */}
          <div className="flex items-center gap-3">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/avatar-i.png"
              alt="Profile"
              width={46}
              height={46}
              className="rounded-full"
            />
            <span className="hidden md:inline text-sm text-[#898e9e]">Me</span>
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/frame-48.png"
              alt="Dropdown"
              width={11}
              height={7}
            />
          </div>
        </motion.nav>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="fixed top-[94px] right-0 w-64 h-[calc(100vh-94px)] bg-white z-50 shadow-xl p-4 md:hidden"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'spring', damping: 20 }}
              >
                {navItems.map((item) => (
                  <Link key={item.alt} href={item.path} className="block p-4 hover:bg-gray-100 rounded">
                    <div className="flex items-center gap-3">
                      <Image src={item.icon} alt={item.alt} width={24} height={24} />
                      <span>{item.alt}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
