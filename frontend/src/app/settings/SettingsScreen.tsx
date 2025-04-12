'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  icon: string;
  text: string;
  link: string;
}

interface SettingsScreenProps {
  onSelect: (screen: string) => void;
  isMobileMenu?: boolean;
}

export default function SettingsScreen({ onSelect, isMobileMenu = false }: SettingsScreenProps) {
  const menuItems: MenuItem[] = [
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/gavel-1.png',
      text: 'Terms and Conditions',
      link: 'terms'
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/chat-1.png',
      text: 'Contact Us',
      link: 'contact'
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/shield-w.png',
      text: 'Privacy Policy',
      link: 'privacy'
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/cookie-1.png',
      text: 'Cookies',
      link: 'cookies'
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/question.png',
      text: 'FAQs',
      link: 'faqs'
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/sign-out.png',
      text: 'Log out',
      link: 'logout'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white rounded-xl shadow-sm ${isMobileMenu ? '' : 'p-6'}`}
    >
      {!isMobileMenu && (
        <motion.h2 
          className="text-2xl font-bold mb-6 text-gray-800"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
        >
          Settings
        </motion.h2>
      )}

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.link}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelect(item.link)}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Image 
                src={item.icon} 
                alt={item.text} 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <span className="text-gray-700 font-medium">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}