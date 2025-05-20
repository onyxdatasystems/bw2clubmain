<<<<<<< HEAD
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface DownloadButtonProps {
  platform: string;
  link: string;
  imageSrc: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ platform, link, imageSrc }) => (
  <motion.button
    onClick={() => window.open(link, '_blank')}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    className="flex items-center justify-center w-[140px] h-[38px] rounded-lg
               bg-gradient-to-b from-white/30 to-white/10
               hover:to-white/60 transition-all duration-200
               border border-white/20 backdrop-blur-md"
  >
    <Image src={imageSrc} alt={platform} width={24} height={24} className="mr-2" />
    <span className="text-purple-500 text-xs font-medium">{platform}</span>
  </motion.button>
);

const DownloadSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const buttons = [
    {
      platform: 'AppStore',
      link: 'https://apps.apple.com',
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/pngwing.png',
    },
    {
      platform: 'Play Store',
      link: 'https://play.google.com',
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/pngwing-2.png',
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex flex-col gap-3 bg-gradient-to-r from-white/20 to-white/10
                 backdrop-blur-sm p-4 rounded-xl border border-white/10
                 w-full max-w-md mx-auto"
    >
      <span className="text-black text-sm font-bold tracking-tight text-center">
        Available on
      </span>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {buttons.map((btn, index) => (
          <DownloadButton key={index} {...btn} />
=======
// components/DownloadButtons.tsx
'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

class DownloadButton {
  constructor(public platform: string, public link: string, public imageSrc: string) {}

  render() {
    return (
      <motion.button
        className="flex items-center justify-center w-[140px] h-[38px] rounded-lg bg-gradient-to-b from-white/30 to-white/10 hover:from-white/30 hover:to-white/60 transition-all duration-200 border border-white/20"
        onClick={() => window.open(this.link, '_blank')}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Image src={this.imageSrc} alt={this.platform} width={24} height={24} className="mr-2" />
        <span className="text-purple-500 text-xs">{this.platform}</span>
      </motion.button>
    );
  }
}

const DownloadSection = () => {
  const buttons = [
    new DownloadButton('AppStore', 'https://apps.apple.com', 'https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/pngwing.png'),
    new DownloadButton('Play Store', 'https://play.google.com', 'https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/pngwing-2.png'),
  ];

  return (
    <div className="flex flex-col gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
      <span className="text-black text-sm font-bold tracking-[-0.5px] text-center">Available on</span>
      <div className="flex flex-row gap-3 justify-center">
        {buttons.map((button, index) => (
          <div key={index}>{button.render()}</div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        ))}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default DownloadSection;
=======
export default DownloadSection;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
