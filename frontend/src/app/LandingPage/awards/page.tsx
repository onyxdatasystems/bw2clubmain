'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AwardCardProps {
  logo: string;
  title: string;
  description: string;
  wreath: string;
  index: number;
}

class AwardAnimations {
  static card = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      transition: { duration: 0.3 }
    }
  };

  static wreath = {
    normal: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: 5 }
  };

  static logo = {
    normal: { scale: 1 },
    hover: { scale: 1.15 }
  };

  static text = {
    normal: { color: "#7171C1" },
    hover: { color: "#5a5a9c" }
  };
}

const AwardCard = ({ logo, title, description, wreath, index }: AwardCardProps) => {
  return (
    <motion.div
      className="relative w-full max-w-[328px] h-[316px] mx-auto"
      variants={AwardAnimations.card}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        variants={AwardAnimations.wreath}
        initial="normal"
        whileHover="hover"
      >
        <Image 
          src={wreath}
          alt="Award wreath"
          width={328}
          height={316}
          className="w-full h-full"
        />
      </motion.div>

      <div className="relative flex flex-col items-center pt-6 h-full">
        <motion.div 
          className="w-20 h-20 relative"
          variants={AwardAnimations.logo}
          initial="normal"
          whileHover="hover"
        >
          <Image
            src={logo}
            alt={`${title} logo`}
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>

        <div className="mt-[60px] px-2 text-center max-w-[228px]">
          <motion.h3 
            className="text-[#7171C1] text-base font-medium mb-3"
            variants={AwardAnimations.text}
            initial="normal"
            whileHover="hover"
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-[#3A3A3A] text-sm leading-[140%] tracking-[-0.41px]"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-100/30 to-blue-100/30 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
    </motion.div>
  );
};

interface AwardsSectionProps {
  awards?: Array<{
    logo: string;
    title: string;
    description: string;
    wreath: string;
  }>;
}

class LayoutStyles {
  static section = "w-full px-4 sm:px-8 md:px-20 py-12 md:py-16 bg-white";
  static container = "max-w-[1120px] mx-auto";
  static title = "text-3xl md:text-[44px] font-semibold text-[#3A3A3A] text-center tracking-[-0.7px] leading-[115%] mb-12 md:mb-20";
  static grid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-[68px]";
}

const AwardsSection = ({ awards = defaultAwards }: AwardsSectionProps) => {
  return (
    <section className={LayoutStyles.section}>
      <div className={LayoutStyles.container}>
        <motion.h2 
          className={LayoutStyles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Awards
        </motion.h2>
        
        <div className={LayoutStyles.grid}>
          {awards.map((award, index) => (
            <AwardCard key={index} {...award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const defaultAwards = [
  {
    logo: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/frame-20.png",
    title: "UN Women",
    description: "Selected as one of the top 24 projects from Eastern Europe and Central Asia by UN Women.",
    wreath: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/pngwing.png"
  },
  {
    logo: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/frame-20-2.png",
    title: "NLB Bank",
    description: "Named one of the top 10 projects in Macedonia by NLB Bank for our contribution to a better society.",
    wreath: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/pngwing-2.png"
  },
  {
    logo: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/frame-20-3.png",
    title: "Regional Cooperation Council",
    description: "Named one of the top 10 projects in Macedonia by NLB Bank for our contribution to a better society.",
    wreath: "https://dashboard.codeparrot.ai/api/image/Z-hcBnn5m-GBkPAy/pngwing-3.png"
  }
];

export default AwardsSection;