"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UserGalleryProps {
  images: string[];
}

const UserGallery: React.FC<UserGalleryProps> = ({ images }) => {
  return (
    <motion.div 
  className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {images.map((src, index) => (
    <motion.div
      key={index}
      className="relative aspect-square overflow-hidden rounded-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={src}
            alt={`Gallery thumbnail ${index}`}
            fill
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UserGallery;