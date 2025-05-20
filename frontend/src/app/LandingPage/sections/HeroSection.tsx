<<<<<<< HEAD
'use client';

import React, { useEffect, useRef } from 'react';
=======
"use client";

import React from 'react';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import Image from 'next/image';
import Link from 'next/link';
import DownloadButtons from './DownloadSection';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      paragraphRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    gsap.fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="relative pt-10 pb-16 min-h-screen overflow-hidden">
      {/* Background Image */}
=======

const HeroSection: React.FC = () => {
  return (
    <section className='relative pt-8 pb-12 min-h-[832px] overflow-hidden'>
      {/* Background Image (ONLY) */}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-gXYgz4-w8v6RjP/group-26.png"
          alt="Background Image"
          fill
          className="object-cover"
          priority
        />
      </div>

<<<<<<< HEAD
      <div className="container mx-auto px-4 relative z-10 flex flex-col">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between flex-grow gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              Better Women, Better World Inc.
            </h1>
            <p
              ref={paragraphRef}
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-800 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              A dynamic startup fueled by a profound passion for catalyzing positive change in the lives of women and girls.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mt-8"
            >
              <Link href="/auth/signin" passHref>
                <motion.button
                  initial={{ opacity: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    opacity: 1,
                    boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-44 h-11 rounded-md text-sm bg-gradient-to-r from-purple-300 to-purple-600 text-white font-medium shadow-lg transition-all"
                >
                  Login
                </motion.button>
              </Link>

              <Link href="/auth/signup" passHref>
                <motion.button
                  initial={{ opacity: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    opacity: 1,
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-44 h-11 rounded-md text-sm bg-gradient-to-r from-indigo-300 to-purple-600 text-white font-medium shadow-lg transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div ref={imageRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-doJQz4-w8v6RhG/componen-5.png"
              alt="People smiling together"
              width={495}
              height={493}
              priority
<<<<<<< HEAD
              className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto drop-shadow-2xl"
=======
              className='md:max-w-full md:h-auto drop-shadow-2xl'
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </div>
        </div>

        {/* Download Section */}
<<<<<<< HEAD
        <div className="mt-12 w-full max-w-md mx-auto">
=======
        <div className="mt-8 md:mt-12 w-full max-w-[500px] mx-auto">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          <DownloadButtons />
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default HeroSection;
=======
export default HeroSection;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
