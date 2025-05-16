// src/components/PartnersSection.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

interface PartnersSectionProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface Partner {
  id: number;
  src: string;
  alt: string;
}

export class PartnersSection extends BaseComponent<PartnersSectionProps> {
  private partners: Partner[] = [
    { id: 1, src: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/partner.png', alt: 'Partner 1' },
    { id: 2, src: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/partner-2.png', alt: 'Partner 2' },
    { id: 3, src: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/partner-3.png', alt: 'Partner 3' },
    { id: 4, src: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/partner-4.png', alt: 'Partner 4' },
  ];

  render() {
    const { className = '', size = 'lg' } = this.props;
    const responsiveClasses = this.getResponsiveClasses(size);

    return (
      <motion.div 
        className={`${className} ${responsiveClasses.container} mx-auto`}
        {...this.defaultAnimation}
      >
        <div className="w-full bg-white p-6 rounded-xl shadow-sm">
          <motion.h3 
            className="text-[#7171c1] text-base font-medium tracking-[-0.5px] leading-[140%] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Our Partners
          </motion.h3>
          <div className="flex flex-wrap justify-between items-center gap-4">
            {this.partners.map((partner) => (
              <motion.div 
                key={partner.id} 
                className="relative w-[167px] h-[84px] mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" }}
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  className="object-contain"
                  sizes="167px"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
}