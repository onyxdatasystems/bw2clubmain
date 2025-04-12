"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className = '' }) => {
  const menuItems = [
    { icon: 'gender-f.png', text: 'HerPower', link: '/herpower' },
    { icon: 'users-th.png', text: 'Thematic Groups', link: '/thematic-groups' },
    { icon: 'calendar.png', text: 'Events', link: '/events' },
    { icon: 'vector.png', text: 'Competitions', link: '/competitions' },
    { icon: 'leaf-2.png', text: 'Initiatives', link: '/initiatives' },
    { icon: 'frame-48-4.png', text: 'EmpowerSphere', link: '/empowersphere' },
    { icon: 'gear-1.png', text: 'Settings & Privacy', link: '/settings' },
  ];

  return (
    <motion.nav
      className={`bg-pink-50 rounded-lg p-5 flex flex-col ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {menuItems.map((item, index) => (
        <Link href={item.link} key={index} passHref>
          <motion.div
            className="flex items-center p-4 rounded-lg hover:bg-pink-100 cursor-pointer transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-7 h-7 relative mr-4">
              <Image
                src={`https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/${item.icon}`}
                alt={item.text}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">{item.text}</span>
          </motion.div>
        </Link>
      ))}
    </motion.nav>
  );
};

export default SideNav;