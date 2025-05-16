"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

interface GetInvolvedSectionProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface Card {
  icon: string;
  title: string;
  alt: string;
}

export class GetInvolvedSection extends BaseComponent<GetInvolvedSectionProps> {
  private cards: Card[] = [
    {
      icon: '/frame-48.png',
      title: 'Become Our Brand Ambassador',
      alt: 'Brand Ambassador Icon'
    },
    {
      icon: '/frame-48-3.png',
      title: 'Suggest An Initiative',
      alt: 'Initiative Icon'
    },
    {
      icon: '/badges-s.png',
      title: 'Discover Our Badges',
      alt: 'Badges Icon'
    },
    {
      icon: '/svg-repo.png',
      title: 'Unlock Your Creativity',
      alt: 'Creativity Icon'
    },
    {
      icon: '/frame-48-2.png',
      title: 'Join Forces With Us',
      alt: 'Join Forces Icon'
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
        <div className="flex flex-row flex-wrap justify-center gap-4 p-6 min-h-[160px]">
          {this.cards.map((card, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center w-[145px] h-[159px] cursor-pointer"
              whileHover={{ 
                y: -5,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className="flex items-center justify-center w-full h-[108px] bg-white rounded-t-lg shadow-sm"
                whileHover={{ backgroundColor: "#fff2f9" }}
              >
                <motion.div 
                  className="relative w-[52px] h-[52px]"
                  whileHover={{ rotate: 10 }}
                >
                  <Image
                    src={card.icon}
                    alt={card.alt}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
              <div className="flex items-center justify-center w-full h-[51px] bg-white border-t border-[#e5e5e5] rounded-b-lg shadow-sm">
                <p className="text-[13px] text-[#636878] text-center leading-[140%] tracking-[-0.41px] font-inter px-2">
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
}