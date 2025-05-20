<<<<<<< HEAD
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
=======
// components/Header.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

class HeaderAnimations {
  static logo = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.8 } }
  };

  static navItem = (i: number) => ({
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" }
    },
    hover: { color: "#000", scale: 1.05, transition: { duration: 0.2 } }
  });

  static mobileMenu = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  static menuIcon = {
    open: { rotate: 180, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } }
  };
}

class HeaderLayout {
  static header = "sticky top-0 left-0 right-0 bg-white shadow-md z-[100]";
  static mainBar = "py-4 relative z-30 bg-white";
  static container = "container mx-auto px-6 flex items-center justify-between";
  static desktopNav = "hidden md:flex space-x-8";
  static mobileNav = "md:hidden fixed inset-0 w-full h-screen bg-white pt-24 z-20 overflow-y-auto";
  static navItem = "block py-2 relative";
  static underline = "absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300";
}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

const navItems = [
  { href: "/", label: "Home" },
  { href: "/LandingPage/whoweare", label: "BW2CLUB" },
  { href: "/LandingPage/features", label: "Features" },
  { href: "/LandingPage/awards", label: "Awards" },
  { href: "/LandingPage/partners", label: "Partners" },
  { href: "/LandingPage/contact", label: "Contact" }
];

<<<<<<< HEAD
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    if (navRef.current) {
      gsap.fromTo(
        Array.from(navRef.current.children),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.1, delay: 0.5, duration: 0.5 }
      );
    }
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="py-4 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link href="/">
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/logo.png"
                alt="Company Logo"
                width={56}
                height={56}
                className="w-12 h-12 sm:w-14 sm:h-14 transition-opacity hover:opacity-90"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            className="hidden md:flex space-x-6 lg:space-x-8 items-center"
          >
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative text-gray-700 font-medium text-base lg:text-lg group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-800" />
            ) : (
              <HamburgerIcon />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-6"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="mb-6"
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-800 text-xl font-semibold block"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const HamburgerIcon = () => (
  <div className="flex flex-col space-y-1">
    <span className="block h-0.5 w-6 bg-gray-800" />
    <span className="block h-0.5 w-5 bg-gray-800" />
    <span className="block h-0.5 w-4 bg-gray-800" />
  </div>
);
=======
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header className={HeaderLayout.header} initial="hidden" animate="visible">
      <div className="group">
        <div className={HeaderLayout.mainBar}>
          <div className={HeaderLayout.container}>
            <motion.div variants={HeaderAnimations.logo} whileHover="hover">
              <Link href="/">
                <Logo />
              </Link>
            </motion.div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-3 flex flex-col items-end justify-center space-y-1.5 cursor-pointer" aria-label="Toggle menu">
                <motion.div animate={isMenuOpen ? "open" : "closed"} variants={HeaderAnimations.menuIcon}>
                  {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <MenuIcon />}
                </motion.div>
              </button>
            </div>

            <DesktopNav />
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div className={HeaderLayout.mobileNav} variants={HeaderAnimations.mobileMenu} initial="hidden" animate="visible" exit="exit">
              <div className="container mx-auto px-6">
                <nav className="flex flex-col space-y-6 py-6">
                  {navItems.map((item, index) => (
                    <MobileNavItem key={index} href={item.href} label={item.label} index={index} onClick={toggleMenu} />
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const Logo = () => (
  <div className="flex items-center">
    <Image src="https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/logo.png" alt="Company Logo" width={64} height={64} className="hover:opacity-90 transition-opacity duration-200" priority />
  </div>
);

const DesktopNav = () => (
  <nav className={HeaderLayout.desktopNav}>
    {navItems.map((item, index) => (
      <DesktopNavItem key={index} href={item.href} label={item.label} index={index} />
    ))}
  </nav>
);

const DesktopNavItem = ({ href, label, index }: { href: string; label: string; index: number }) => (
  <motion.div variants={HeaderAnimations.navItem(index)} whileHover="hover">
    <Link href={href} className={HeaderLayout.navItem}>
      <span className="text-gray-700 font-medium text-lg relative">
        {label}
        <motion.span className={HeaderLayout.underline} whileHover={{ width: "100%" }} />
      </span>
    </Link>
  </motion.div>
);

const MobileNavItem = ({ href, label, index, onClick }: { href: string; label: string; index: number; onClick: () => void; }) => (
  <motion.div variants={HeaderAnimations.navItem(index)}>
    <Link href={href} className={HeaderLayout.navItem} onClick={onClick}>
      <span className="text-gray-700 text-xl font-medium">{label}</span>
    </Link>
  </motion.div>
);

const MenuIcon = () => (
  <>
    <span className="block h-0.5 bg-gray-800 w-6"></span>
    <span className="block h-0.5 bg-gray-800 w-5 mt-1.5"></span>
    <span className="block h-0.5 bg-gray-800 w-4 mt-1.5"></span>
  </>
);

export default Header;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
