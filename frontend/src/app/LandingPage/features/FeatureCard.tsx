'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative h-full">
      <div className="flex flex-col items-center bg-white rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-24 h-24 relative mb-6">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-[#7171C1] mb-3 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;