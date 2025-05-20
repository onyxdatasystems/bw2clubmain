'use client';

<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Layout utility class structure
class PartnerLayout {
  static section =
    'w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 md:py-16 bg-gradient-to-b from-[#f3e8ff] to-white';
  static container =
    'flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-6xl gap-8';
  static textContainer = 'max-w-md p-4 order-1 lg:order-1';
  static partnersGrid =
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[#f3e8ff] rounded-lg order-2 lg:order-2 w-full';
  static partnerCard =
    'flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105';
}

// Partner list
const partners = [
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne.png',
    title: "International Women's Network in Estonia",
  },
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-2.png',
    title: "International Women's Network in Estonia",
  },
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-3.png',
    title: "International Women's Network in Estonia",
  },
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-4.png',
    title: "International Women's Network in Estonia",
  },
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-5.png',
    title: "International Women's Network in Estonia",
  },
  {
    imageUrl:
      'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-6.png',
    title: "International Women's Network in Estonia",
  },
];

const PartnersSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate heading on scroll
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
      },
    });

    // Animate logos on scroll with stagger
    logoRefs.current.forEach((el, index) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      }
    });
  }, []);

  return (
    <section className={PartnerLayout.section}>
      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-10"
      >
        Our Partners
      </h2>

      <div className={PartnerLayout.container}>
        {/* Text Section */}
        <div className={PartnerLayout.textContainer}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            We Work With The Best Partners
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Join us in our mission to empower women and girls globally with
            Better Women Better World. We invite organizations, companies, and
            individuals to partner with us and help create a brighter, more
            inclusive future. Together, we can provide the support, resources,
            and opportunities needed to inspire and uplift women from all
            backgrounds.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: '#5959B3',
              boxShadow: '0 0 15px rgba(89, 89, 179, 0.5)',
            }}
            className="bg-[#7171C1] text-white px-6 py-2 rounded-md transition-all"
          >
            Become a Partner
          </motion.button>
        </div>

        {/* Partner Logos Grid */}
        <div className={PartnerLayout.partnersGrid}>
          {partners.map((partner, index) => (
            <div
              key={index}
              ref={(el) => {
                logoRefs.current[index] = el;
              }}
              className={PartnerLayout.partnerCard}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
=======
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

class PartnerAnimations {
  static container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  static text = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  static partnerCard = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -5,
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(113, 113, 193, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  static button = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#5959B3",
      boxShadow: "0 0 15px rgba(89, 89, 179, 0.5)",
      transition: { duration: 0.3 }
    }
  };
}

class PartnerLayout {
  static section = "w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 md:py-16 bg-gradient-to-b from-[#f3e8ff] to-white";
  static container = "flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-6xl gap-8";
  // Changed order for mobile/tablet (order-1) and desktop (lg:order-2)
  static textContainer = "max-w-md p-4 order-1 lg:order-1";
  // Changed order for mobile/tablet (order-2) and desktop (lg:order-2)
  static partnersGrid = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[#f3e8ff] rounded-lg order-2 lg:order-2 w-full";
  static partnerCard = "flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md";
}

interface Partner {
  imageUrl: string;
  title: string;
}

const partners: Partner[] = [
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne.png', title: 'International Women\'s Network in Estonia' },
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-2.png', title: 'International Women\'s Network in Estonia' },
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-3.png', title: 'International Women\'s Network in Estonia' },
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-4.png', title: 'International Women\'s Network in Estonia' },
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-5.png', title: 'International Women\'s Network in Estonia' },
  { imageUrl: 'https://dashboard.codeparrot.ai/api/image/Z-kyOHn5m-GBkPDK/logo-iwne-6.png', title: 'International Women\'s Network in Estonia' },
];

const PartnersSection: React.FC = () => {
  return (
    <motion.div 
      className={PartnerLayout.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className="text-3xl font-semibold text-gray-800 mb-8 text-center"
        variants={PartnerAnimations.text}
      >
        Our Partners
      </motion.h2>

      <motion.div 
        className={PartnerLayout.container}
        variants={PartnerAnimations.container}
      >
        <motion.div 
          className={PartnerLayout.textContainer}
          variants={PartnerAnimations.text}
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-800 mb-4"
            variants={PartnerAnimations.text}
          >
            We Work With The Best Partners
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-600 mb-4"
            variants={PartnerAnimations.text}
          >
            Join us in our mission to empower women and girls globally with Better Women Better World. We invite organizations, companies, and individuals to partner with us and help create a brighter, more inclusive future. Together, we can provide the support, resources, and opportunities needed to inspire and uplift women from all backgrounds. Your partnership will make a significant impact in fostering a community where every woman and girl can thrive. Let's unite to celebrate diversity, promote well-being, and drive positive change.
          </motion.p>
          <motion.button 
            className="bg-[#7171C1] text-white px-6 py-2 rounded-md transition-colors"
            variants={PartnerAnimations.button}
            whileHover="hover"
          >
            Become a Partner
          </motion.button>
        </motion.div>

        <motion.div 
          className={PartnerLayout.partnersGrid}
          variants={PartnerAnimations.container}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className={PartnerLayout.partnerCard}
              variants={PartnerAnimations.partnerCard}
              custom={index}
              whileHover="hover"
            >
              <motion.div 
                className="relative w-24 h-24 mb-4"
                whileHover={{ scale: 1.1 }}
              >
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                <Image
                  src={partner.imageUrl}
                  alt={partner.title}
                  fill
                  className="object-contain"
                />
<<<<<<< HEAD
              </div>
              <p className="text-sm text-gray-800">{partner.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
=======
              </motion.div>
              <motion.p 
                className="text-sm text-gray-800"
                whileHover={{ color: "#7171C1" }}
              >
                {partner.title}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PartnersSection;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
