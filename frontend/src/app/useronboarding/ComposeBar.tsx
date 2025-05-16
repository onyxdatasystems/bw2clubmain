'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ComposeBarProps {
  className?: string;
}

const ComposeBar: React.FC<ComposeBarProps> = ({ className = '' }) => {
  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: 'rgba(235, 236, 239, 0.8)' },
    tap: { scale: 0.95 }
  };

  const postButtonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: '0 4px 8px rgba(103, 103, 183, 0.3)',
      opacity: 0.9
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className={`flex flex-row w-full max-w-[546px] h-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-row w-full h-auto gap-3 p-4 pl-3 bg-white rounded-lg border border-[#ebecef] shadow-sm hover:shadow-md transition-shadow">
        <motion.div 
          className="relative w-10 h-10"
          whileHover={{ scale: 1.05 }}
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/asset-3.png"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-[72px]"
          />
        </motion.div>
        
        <div className="flex flex-col flex-grow gap-3">
          <motion.div 
            className="flex flex-row w-full h-12 gap-2 p-[14px] px-3 bg-white rounded border border-[#ebecef]"
            whileFocus={{ borderColor: '#8585D5' }}
          >
            <input
              type="text"
              placeholder="What's going on..."
              className="w-full text-sm text-[#898e9e] font-inter focus:outline-none"
            />
          </motion.div>
          
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              {['image-3.png', 'play-circ-3.png', 'papercli-3.png'].map((icon, index) => (
                <motion.button
                  key={index}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center"
                >
                  <Image 
                    src={`https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/${icon}`}
                    alt={icon.includes('image') ? 'Image' : icon.includes('play') ? 'Video' : 'Attachment'}
                    width={24}
                    height={24}
                  />
                </motion.button>
              ))}
            </div>
            
            <motion.button 
              variants={postButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-b from-[#8585D5] to-[#6767B7]"
            >
              Post
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComposeBar;