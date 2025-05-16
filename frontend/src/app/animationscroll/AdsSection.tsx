"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AdsSectionProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdsSection: React.FC<AdsSectionProps> = ({ className = '', style = {} }) => {
  return (
    <motion.div 
      className={`hidden lg:flex flex-col bg-white rounded-lg p-4 w-full max-w-[225px] shadow-sm hover:shadow-md transition-shadow ${className}`}
      style={style}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="border-b border-slate-200 pb-4 mb-4">
        <motion.span 
          className="text-black text-sm font-normal"
          whileHover={{ color: '#7171c1' }}
          transition={{ duration: 0.2 }}
        >
          Advertising
        </motion.span>
      </div>

      <div className="border-t border-slate-200 pt-4 flex justify-center">
        <motion.div 
          className="w-full max-w-[210px] h-auto relative rounded-xl overflow-hidden"
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/rectangl-3.png"
            alt="Advertisement"
            layout="responsive"
            width={210}
            height={241}
            className="rounded-xl object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdsSection;