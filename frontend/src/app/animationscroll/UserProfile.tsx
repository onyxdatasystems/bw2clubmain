"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className = '' }) => {
  const profileInfo = [
    { icon: 'graduati.png', text: 'Works as Founder at Better Women Better World' },
    { icon: 'briefcas.png', text: 'Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona' },
    { icon: 'cake-1.png', text: 'Born on August 2, 1988', muted: true },
    { icon: 'leo-svgr.png', text: 'Leo', muted: true },
    { icon: 'globe-2.png', text: 'English', muted: true }
  ];

  return (
    <motion.div 
      className={`bg-white rounded-lg border border-gray-100 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cover Image */}
      <motion.div 
        className="w-full h-32 relative"
        whileHover={{ scale: 1.01 }}
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/rectangl.png"
          alt="Cover"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Profile Image */}
      <motion.div 
        className="ml-5 -mt-14 z-10 relative"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/avatar.png"
          alt="Profile"
          width={115}
          height={115}
          className="rounded-full border-4 border-white"
        />
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mr-5 mt-5">
        <motion.button
          className="flex items-center gap-1 px-3 py-1 rounded-full border border-indigo-400 text-indigo-400 text-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/paper-pl.png" 
            alt="Message" 
            width={16} 
            height={16} 
          />
          <span>Buzz Me</span>
        </motion.button>
        <motion.button
          className="px-3 py-1 rounded-full bg-gradient-to-b from-indigo-300 to-indigo-400 text-white text-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Support
        </motion.button>
        <motion.div whileHover={{ rotate: 90 }} className="cursor-pointer">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/more-hor.png"
            alt="More"
            width={23}
            height={23}
          />
        </motion.div>
      </div>

      {/* Name */}
      <h1 className="text-xl font-semibold ml-5 mt-3">Ksenija Nikolova</h1>

      {/* Info Section */}
      <div className="flex flex-col gap-3 m-5">
        {profileInfo.map((info, index) => (
          <motion.div 
            key={index}
            className="flex gap-2 items-start"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Image
              src={`https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/${info.icon}`}
              alt={info.text}
              width={18}
              height={18}
              className="mt-0.5"
            />
            <span className={`text-sm ${info.muted ? 'text-gray-500' : ''}`}>
              {info.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserProfile;