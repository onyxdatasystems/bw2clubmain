'use client';

<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class StayTunedLayout {
  static section = "w-full max-w-[1280px] mx-auto py-12 px-4 flex items-center justify-center";
  static container = "flex flex-col md:flex-row items-center gap-8 md:gap-12";
  static imageContainer = "w-full md:w-[411px] relative";
  static contentContainer = "flex flex-col gap-6 max-w-[640px]";
  static title = "text-3xl sm:text-[44px] font-semibold leading-tight tracking-[-0.7px] text-[#3a3a3a]";
  static description = "text-sm sm:text-base leading-relaxed sm:leading-6 text-[#3a3a3a]";
  static formContainer = "flex flex-col sm:flex-row gap-3 mt-2";
  static input = "w-full sm:w-[320px] h-11 px-5 rounded-full border border-[#ededed] text-sm text-black/60 focus:outline-none transition-all";
  static inputError = "border-[#FF4D4F]";
  static button = "h-11 px-8 rounded-full bg-gradient-to-r from-[#7B7FD9] to-[#9E9FD9] text-white text-sm font-normal transition-all";
  static errorMessage = "text-xs text-[#FF4D4F] mt-1";
}

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function StayTuned({
  onSubscribe,
  onInvalidEmail,
}: {
  onSubscribe?: (email: string) => void;
  onInvalidEmail?: (email: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
          },
        }
      );
    }

    // Image animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

=======
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

class StayTunedAnimations {
  static container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  static image = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, type: "spring" }
    }
  };

  static content = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, type: "spring" }
    }
  };

  static button = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(123, 127, 217, 0.5)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  static input = {
    focus: {
      borderColor: "#7B7FD9",
      boxShadow: "0 0 0 2px rgba(123, 127, 217, 0.2)",
      transition: { duration: 0.2 }
    },
    error: {
      borderColor: "#FF4D4F",
      boxShadow: "0 0 0 2px rgba(255, 77, 79, 0.2)",
      transition: { duration: 0.2 }
    }
  };
}

class StayTunedLayout {
  static section = "w-full max-w-[1280px] py-12 px-4 flex items-center justify-center";
  static container = "flex flex-col md:flex-row items-center gap-8 md:gap-12";
  static imageContainer = "w-full md:w-[411px] relative";
  static contentContainer = "flex flex-col gap-6 max-w-[640px]";
  static title = "text-3xl sm:text-[44px] font-semibold leading-[1.15] tracking-[-0.7px] text-[#3a3a3a]";
  static description = "text-sm sm:text-base leading-5 sm:leading-6 text-[#3a3a3a]";
  static formContainer = "flex flex-col sm:flex-row gap-3 mt-2";
  static input = "w-full sm:w-[320px] h-11 px-5 rounded-[1000px] border border-[#ededed] text-sm text-black/60 focus:outline-none transition-all";
  static inputError = "border-[#FF4D4F]";
  static button = "h-11 px-8 rounded-[1000px] bg-gradient-to-r from-[#7B7FD9] to-[#9E9FD9] text-white text-sm font-normal transition-colors";
  static errorMessage = "text-xs text-[#FF4D4F] mt-[-8px] ml-4";
}

interface StayTunedProps {
  onSubscribe?: (email: string) => void;
  onInvalidEmail?: (email: string) => void;
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const StayTuned: React.FC<StayTunedProps> = ({ onSubscribe, onInvalidEmail }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  const handleSubscribe = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
<<<<<<< HEAD
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      onInvalidEmail?.(email);
      return;
    }
    setError('');
    onSubscribe?.(email);
    setEmail('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubscribe();
  };

  return (
    <section className={StayTunedLayout.section}>
      <div className={StayTunedLayout.container}>
        {/* Image */}
        <div ref={imageRef} className={StayTunedLayout.imageContainer}>
=======

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      if (onInvalidEmail) {
        onInvalidEmail(email);
      }
      return;
    }

    setError('');
    if (onSubscribe) {
      onSubscribe(email);
      setEmail('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <motion.div 
      className={StayTunedLayout.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={StayTunedAnimations.container}
    >
      <div className={StayTunedLayout.container}>
        {/* Left side with image */}
        <motion.div 
          className={StayTunedLayout.imageContainer}
          variants={StayTunedAnimations.image}
        >
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-hqfQz4-w8v6Rko/11100006.png"
            alt="Stay Tuned Illustration"
            width={411}
            height={463}
<<<<<<< HEAD
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Content */}
        <div className={StayTunedLayout.contentContainer}>
          <h2 ref={headingRef} className={StayTunedLayout.title}>
            Stay Tuned
          </h2>

          <p className={StayTunedLayout.description}>
            Follow us on social networks or subscribe for news. We’ll deliver
            valuable updates without spam.
          </p>

          {/* Form */}
          <div className={StayTunedLayout.formContainer}>
            <motion.input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              className={`${StayTunedLayout.input} ${error ? StayTunedLayout.inputError : ''}`}
              whileFocus={error ? { borderColor: '#FF4D4F' } : { borderColor: '#7B7FD9' }}
            />

            <motion.button
              onClick={handleSubscribe}
              className={StayTunedLayout.button}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(123,127,217,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>

          {error && (
            <p className={StayTunedLayout.errorMessage}>
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
=======
            className="w-full h-auto"
          />
        </motion.div>

        {/* Right side content */}
        <motion.div 
          className={StayTunedLayout.contentContainer}
          variants={StayTunedAnimations.content}
        >
          <motion.h1 
            className={StayTunedLayout.title}
            whileHover={{ scale: 1.01 }}
          >
            Stay Tuned
          </motion.h1>
          
          <motion.p 
            className={StayTunedLayout.description}
            whileHover={{ scale: 1.01 }}
          >
            Follow us in social networks. You can also subscribe for our news. We are going to provide you with actual and important for you information without spam or fluff.
          </motion.p>

          <div>
            <motion.div 
              className={StayTunedLayout.formContainer}
              whileHover={{ scale: 1.01 }}
            >
              <motion.input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                className={`${StayTunedLayout.input} ${error ? StayTunedLayout.inputError : ''}`}
                whileFocus={error ? "error" : "focus"}
                variants={StayTunedAnimations.input}
              />
              
              <motion.button
                onClick={handleSubscribe}
                className={StayTunedLayout.button}
                whileHover="hover"
                whileTap="tap"
                variants={StayTunedAnimations.button}
              >
                Subscribe
              </motion.button>
            </motion.div>
            {error && <motion.p 
              className={StayTunedLayout.errorMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StayTuned;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
