"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DownloadButtons from './DownloadSection';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className='relative pt-8 pb-12 min-h-[832px] overflow-hidden'>
      {/* Background Image (ONLY) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-gXYgz4-w8v6RjP/group-26.png"
          alt="Background Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
        <div className='md:flex md:items-center md:justify-between flex-grow'>
          {/* Content Column */}
          <div className='md:w-1/2'>

            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Better Women, Better World Inc.
            </h1>
            <p className="text-xl text-gray-800 tracking-tighter mt-6 max-w-[600px] leading-relaxed">
              A dynamic startup fueled by a profound passion for catalyzing positive change in the lives of women and girls.
            </p>
            
            <div className="flex gap-4 items-center mt-8">
            <Link href="/auth/signin" passHref>
      <motion.button
    initial={{ opacity: 0.8 }}
    whileHover={{ 
      scale: 1.05,
      opacity: 1,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }} className="relative w-[171px] h-[45px] rounded-md text-sm
                bg-gradient-to-r from-purple-300 to-purple-600
                hover:from-purple-400 hover:to-purple-500
                text-white font-medium
                transition-all duration-300 ease-out
                shadow-lg hover:shadow-xl hover:shadow-purple-500/30
                transform hover:-translate-y-0.5 active:translate-y-0">
                Login
              </motion.button>
              </Link>
              
              <Link href="/auth/signup" passHref>
         <motion.button
    initial={{ opacity: 0.8 }}
    whileHover={{ 
      scale: 1.05,
      opacity: 1,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }} className="w-[171px] h-[45px] rounded-md text-sm
                bg-gradient-to-r from-indigo-300 to-purple-600
                hover:from-indigo-400 hover:to-purple-500
                text-white font-medium
                transition-all duration-300
                shadow-lg hover:shadow-xl hover:shadow-purple-500/30
                transform hover:-translate-y-0.5 active:translate-y-0">
                Sign up
                </motion.button>
                </Link>
            </div>
          </div>

          {/* Foreground Image Column */}
          <div className='md:w-1/2 mt-20 md:mt-0 flex justify-end'>
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/componen-5.png"
              alt="People smiling together"
              width={495}
              height={493}
              priority
              className='md:max-w-full md:h-auto drop-shadow-2xl'
            />
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 md:mt-12 w-full max-w-[500px] mx-auto">
          <DownloadButtons />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;