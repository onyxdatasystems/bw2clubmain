'use client';

<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center h-full"
      whileHover={{
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(113, 113, 193, 0.2)',
      }}
    >
      <div className="relative w-full h-40 mb-4">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold text-[#7171C1] mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
=======
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

class FeatureAnimations {
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

  static title = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  static card = (index: number) => ({
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(113, 113, 193, 0.2)",
      transition: { duration: 0.3 }
    }
  });

  static glow = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
}

class FeatureLayout {
  static section = "flex flex-col items-center w-full p-6 sm:p-8 bg-gradient-to-b from-white to-purple-100";
  static title = "text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-gray-800";
  static grid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full max-w-7xl";
}

const FeaturesLayout: React.FC = () => {
  const features = [
    {
      title: "Global Connectivity",
      description: "Access a wealth of resources, including workshops, webinars, creative challenges, and initiatives focused on personal and professional development.",
      imageSrc: "https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20.png"
    },
    {
      title: "Diverse Community",
      description: "Connect with women and girls worldwide, sharing experiences and building supportive relationships across borders.",
      imageSrc: "https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-3.png"
    },
    {
      title: "Empowerment Resources",
      description: "Celebrate and embrace diversity by engaging with members from various cultural and professional backgrounds.",
      imageSrc: "https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-5.png"
    },
    {
      title: "Inspirational Stories",
      description: "Read and share inspiring stories of triumph and resilience, motivating members to achieve their goals.",
      imageSrc: "https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-4.png"
    },
    {
      title: "Empowerment Resources",
      description: "Celebrate and embrace diversity by engaging with members from various cultural and professional backgrounds.",
      imageSrc: "https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-2.png"
    }
  ];

  return (
    <motion.div 
      className={FeatureLayout.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className={FeatureLayout.title}
        variants={FeatureAnimations.title}
      >
        Features
      </motion.h2>

      <motion.div 
        className={FeatureLayout.grid}
        variants={FeatureAnimations.container}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={FeatureAnimations.card(index)}
            whileHover="hover"
          >
            <FeatureCard 
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-xl pointer-events-none"
              variants={FeatureAnimations.glow}
            />
          </motion.div>
        ))}
      </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </motion.div>
  );
};

<<<<<<< HEAD
const FeaturesLayout: React.FC = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  const features = [
    {
      title: 'Global Connectivity',
      description:
        'Access a wealth of resources, including workshops, webinars, creative challenges, and initiatives focused on personal and professional development.',
      imageSrc:
        'https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20.png',
    },
    {
      title: 'Diverse Community',
      description:
        'Connect with women and girls worldwide, sharing experiences and building supportive relationships across borders.',
      imageSrc:
        'https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-3.png',
    },
    {
      title: 'Empowerment Resources',
      description:
        'Celebrate and embrace diversity by engaging with members from various cultural and professional backgrounds.',
      imageSrc:
        'https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-5.png',
    },
    {
      title: 'Inspirational Stories',
      description:
        'Read and share inspiring stories of triumph and resilience, motivating members to achieve their goals.',
      imageSrc:
        'https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-4.png',
    },
    {
      title: 'Empowerment Tools',
      description:
        'Gain access to guides, mentorship, and toolkits tailored for women’s empowerment in various fields.',
      imageSrc:
        'https://dashboard.codeparrot.ai/api/image/Z-hPPnn5m-GBkPAf/frame-20-2.png',
    },
  ];

  return (
    <section className="flex flex-col items-center w-full px-6 sm:px-8 md:px-12 py-16 bg-gradient-to-b from-white to-purple-100">
      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl font-semibold mb-10 text-gray-800 text-center"
      >
        Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesLayout;
=======
export default FeaturesLayout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
