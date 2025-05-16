'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

class ActiveUsersAnimations {
  static container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4
      }
    }
  };

  static image = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.3
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.4 }
    }
  };

  static wreath = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    },
    hover: {
      rotate: 5,
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  static counter = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        delay: 0.6,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.1,
      textShadow: "0 0 10px rgba(113, 113, 193, 0.5)",
      transition: { duration: 0.3 }
    }
  };
}

class ActiveUsersLayout {
  static container = "relative flex flex-col lg:flex-row items-center justify-center w-full h-full min-h-[500px]";
  static imageContainer = "relative w-full lg:w-[50%] max-w-[661px] h-[300px] sm:h-[400px] lg:h-[509px] mb-8 lg:mb-0 lg:mr-8 xl:mr-16";
  static statsContainer = "relative w-[280px] sm:w-[350px] h-[270px] sm:h-[337px]";
  static counterText = "text-[44px] font-semibold text-[#7171c1] leading-[115%] tracking-[-0.7px]";
  static labelText = "text-[20px] font-medium text-black leading-[140%] tracking-[-0.5px] mt-4";
  static background = "absolute inset-0 -z-10 overflow-hidden";
}

interface ActiveUsersCardProps {
  activeUsers?: number;
}

const ActiveUsersCard = ({ activeUsers = 429 }: ActiveUsersCardProps) => {
  return (
    <motion.div 
      className={ActiveUsersLayout.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background decorative elements */}
      <div className={ActiveUsersLayout.background}>
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-httwz4-w8v6Rkq/componen-2.png"
          alt="Background decoration"
          fill
          className="object-cover"
        />
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-httwz4-w8v6Rkq/componen.png"
          alt="Background pattern"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Left image section */}
      <motion.div 
        className={ActiveUsersLayout.imageContainer}
        variants={ActiveUsersAnimations.image}
        whileHover="hover"
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-httwz4-w8v6Rkq/frame-20.png"
          alt="Group photo"
          fill
          className="object-cover rounded-3xl shadow-xl"
        />
      </motion.div>

      {/* Right stats section */}
      <motion.div 
        className={ActiveUsersLayout.statsContainer}
        variants={ActiveUsersAnimations.wreath}
        whileHover="hover"
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-httwz4-w8v6Rkq/pngwing-2.png"
          alt="Laurel wreath"
          fill
          className="object-contain"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          variants={ActiveUsersAnimations.counter}
        >
          <motion.span 
            className={ActiveUsersLayout.counterText}
            whileHover="hover"
          >
            {activeUsers.toLocaleString()}
          </motion.span>
          <motion.span 
            className={ActiveUsersLayout.labelText}
            whileHover={{ color: "#7171c1" }}
          >
            Active Users
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ActiveUsersCard;