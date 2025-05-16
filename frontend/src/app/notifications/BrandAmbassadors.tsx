// src/components/BrandAmbassadors.tsx
'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

interface BrandAmbassadorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface Ambassador {
  id: number;
  name: string;
  image: string;
  description: string;
}

export class BrandAmbassadors extends BaseComponent<BrandAmbassadorProps> {
  private ambassadors: Ambassador[] = [
    {
      id: 1,
      name: 'Hosea Akinkami',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/ellipse-2.png',
      description: 'I love me for me. I\u2019m brave, bold and beautiful'
    },
    {
      id: 2,
      name: 'Krishnuna Lovlac...',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/ellipse.png',
      description: 'I love me for me. I\u2019m brave, bold and beautiful'
    },
    {
      id: 3,
      name: 'Hosea Akinkami',
      image: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/ellipse-3.png',
      description: 'I love me for me. I\u2019m brave, bold and beautiful'
    }
  ];

  render() {
    const { className = '', size = 'lg' } = this.props;
    const responsiveClasses = this.getResponsiveClasses(size);

    return (
      <motion.div 
        className={`${className} ${responsiveClasses.container} mx-auto`}
        {...this.defaultAnimation}
      >
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <motion.h2 
            className="text-[#7171c1] text-base font-medium tracking-tight mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Brand Ambassadors Empowerment Wall
          </motion.h2>
          
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {this.ambassadors.map((ambassador) => (
              <motion.div 
                key={ambassador.id}
                className={`flex-none ${responsiveClasses.card} bg-white rounded-xl border border-[#b9b9b9] p-4 overflow-hidden`}
                {...this.cardHoverAnimation}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="relative w-[101px] h-[101px] mb-4"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring" }}
                  >
                    <Image
                      src={ambassador.image}
                      alt={ambassador.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-[#3a3a3a] text-sm mb-2 font-medium">
                    {ambassador.name}
                  </h3>
                  <p className="text-[#636878] text-sm text-center mb-4">
                    {ambassador.description}
                  </p>
                  <motion.button 
                    className="px-6 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
}