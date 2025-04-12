"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BackgroundPatterns {
  pattern1: string;
  pattern2: string;
}

interface CTAButton {
  text: string;
  href: string;
  color: string;
  hoverColor: string;
}

class WhoWeAreStyles {
  static container = "relative w-full min-h-screen bg-white overflow-hidden flex justify-center items-center";
  static contentWrapper = "relative max-w-[1120px] mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8";
  static imageContainer = "w-full md:w-[475px] h-[350px] md:h-[496px] relative rounded-lg overflow-hidden";
  static textContainer = "flex flex-col gap-6 w-full md:w-[562px]";
  static title = "text-3xl md:text-[44px] font-semibold text-[#3A3A3A] leading-tight";
  static description = "text-sm md:text-[14px] text-[#3A3A3A] leading-relaxed md:leading-[20px] font-normal";
  static ctaButton = (button: CTAButton) => 
    `inline-flex w-[171px] h-[45px] items-center justify-center ${button.color} ${button.hoverColor} transition-all rounded-full text-white text-sm md:text-[14px] leading-[20px] shadow-lg hover:shadow-xl transform hover:-translate-y-1`;
}

const WhoWeAre = ({
  title = "Who we are?",
  description = `Founded by Ksenija Nikolova, an internationally published author, entrepreneur and digital creator, Better Women Better World was born from a deep-seated passion for gender equality and a desire to empower women and girls worldwide.

  With a vision of a world where women are empowered to thrive and succeed, we strive to make a difference through our initiatives and projects. Our flagship product, the BW2CLUB support network digital platform and mobile app, serves as a digital oasis where women and girls from different cultures and backgrounds can connect, find support, solidarity, encouragement to navigate life's challenges and pursue their dreams.
  
  BW2CLUB stands as an empowering female community where diversity, empathy, and solidarity thrive. In just two months since our launch, our community has grown to include over 350 women and girls from more than 20 countries. Together, we are creating a secure haven where everyone is welcomed, understood, and supported.`,
  imageSrc = "https://dashboard.codeparrot.ai/api/image/Z-gpX3n5m-GBkO__/group-26.png",
  backgroundPatterns = {
    pattern1: "https://dashboard.codeparrot.ai/api/image/Z-gpX3n5m-GBkO__/componen.png",
    pattern2: "https://dashboard.codeparrot.ai/api/image/Z-gpX3n5m-GBkO__/componen-2.png"
  },
  ctaButton = {
    text: "Visit us",
    href: "#",
    color: "bg-gradient-to-r from-[#7B7FD6] to-[#9C9EE8]",
    hoverColor: "hover:bg-gradient-to-r hover:from-[#6366c4] hover:to-[#7B7FD6]"
  }
}: {
  title?: string;
  description?: string;
  imageSrc?: string;
  backgroundPatterns?: BackgroundPatterns;
  ctaButton?: CTAButton;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div 
      className={WhoWeAreStyles.container}
      initial="hidden"
      animate={isMounted ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundPatterns.pattern1}
            alt="Background pattern 1"
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundPatterns.pattern2}
            alt="Background pattern 2"
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/90" />

      {/* Main content */}
      <motion.div 
        className={WhoWeAreStyles.contentWrapper}
        variants={containerVariants}
      >
        <motion.div 
          className={WhoWeAreStyles.imageContainer}
          variants={imageVariants}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover rounded-lg shadow-xl"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
        </motion.div>

        <motion.div 
          className={WhoWeAreStyles.textContainer}
          variants={containerVariants}
        >
          <motion.h1 
            className={WhoWeAreStyles.title}
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            {description.split('\n\n').map((paragraph, index) => (
              <motion.p 
                key={index}
                className={WhoWeAreStyles.description}
                variants={itemVariants}
                transition={{ delay: 0.1 * index }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={ctaButton.href}
                className={WhoWeAreStyles.ctaButton(ctaButton)}
              >
                {ctaButton.text}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhoWeAre;