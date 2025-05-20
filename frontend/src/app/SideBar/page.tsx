<<<<<<< HEAD
import SideNav from './SideNav';

const Sidebar = () => {
  return (
    <div className="flex">
      <SideNav />
      {/* Other content */}
    </div>
  );
};

export default Sidebar;
=======
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface MenuItem {
  icon: string;
  text: string;
  href: string;
  color?: string;
}

interface SideNavProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const menuItems: MenuItem[] = [
  {
    icon: 'gender-f-6.png',
    text: 'HerPower',
    href: '/herpower',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: 'users-th-6.png',
    text: 'Thematic Groups',
    href: '/groups',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: 'calendar-6.png',
    text: 'Events',
    href: '/events',
    color: 'from-green-400 to-teal-500'
  },
  {
    icon: 'frame-48-18.png',
    text: 'Competitions',
    href: '/competitions',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: 'leaf-2-6.png',
    text: 'Initiatives',
    href: '/initiatives',
    color: 'from-emerald-400 to-lime-500'
  },
  {
    icon: 'frame-48-19.png',
    text: 'EmpowerSphere',
    href: '/empowersphere',
    color: 'from-indigo-400 to-violet-500'
  },
  {
    icon: 'gear-1-6.png',
    text: 'Settings & Privacy',
    href: '/settings',
    color: 'from-gray-400 to-slate-500'
  }
];

const SideNav: React.FC<SideNavProps> = ({ className = '', size = 'md' }) => {
  const getResponsiveClasses = (size: string) => {
    return {
      container: size === 'sm' ? 'w-64' : size === 'lg' ? 'w-80' : 'w-72'
    };
  };

  const responsiveClasses = getResponsiveClasses(size);

  return (
    <motion.nav 
      className={`${className} ${responsiveClasses.container} bg-gradient-to-b from-[#fff2f9] to-[#ffeef7] rounded-2xl shadow-lg p-4 mx-auto`}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.ul 
        className="flex flex-col gap-1"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item, index) => (
          <motion.li 
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={item.href} passHref>
              <motion.div
                className={`group flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-all`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${item.color} shadow-md`}
                  whileHover={{ rotate: 10 }}
                >
                  <Image
                    src={`https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/${item.icon}`}
                    alt={item.text}
                    width={24}
                    height={24}
                    className="filter brightness-0 invert"
                  />
                </motion.div>
                <motion.span 
                  className="text-[#292b32] text-sm font-medium group-hover:text-[#7171c1] transition-colors"
                >
                  {item.text}
                </motion.span>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Profile section */}
      <motion.div 
        className="mt-6 pt-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/profile" passHref>
          <motion.div 
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-nQCgz4-w8v6Ro4/avatar-i-2.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-[#292b32]">Your Profile</div>
              <div className="text-xs text-gray-500">View and edit</div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default SideNav;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
