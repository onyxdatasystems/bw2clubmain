<<<<<<< HEAD
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BaseProfile from "./BaseProfile";

interface GalleryItem {
  id: string;
  url: string;
  alt: string;
}

const UserProfileWithGallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/gallery`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setGalleryItems(data);
      } catch {
        // fallback
        setGalleryItems([
          { id: "1", url: "/gallery/thumbnail-1.png", alt: "Gallery 1" },
          { id: "2", url: "/gallery/thumbnail-2.png", alt: "Gallery 2" },
          { id: "3", url: "/gallery/thumbnail-3.png", alt: "Gallery 3" },
          { id: "4", url: "/gallery/thumbnail-4.png", alt: "Gallery 4" },
          { id: "5", url: "/gallery/thumbnail-5.png", alt: "Gallery 5" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, []);

  return (
    <BaseProfile
=======
// components/UserProfileWithGallery.tsx
"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithGallery: React.FC = () => {
  const galleryItems = [
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-2.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-3.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-4.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-5.png"
  ];

  return (
    <BaseProfile 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      name="Better Women Better World"
      role="Social Networking Platform"
      location="Mid, Delaware"
      establishedDate="Established on August 2, 2021"
<<<<<<< HEAD
      website="https://growwr.co"
      avatarUrl="/avatars/avatar-10.png"
      backgroundUrl="/images/background-10.png"
    >
      {({ renderTabs, activeTab }) => (
        <div>
          {renderTabs()}

          {activeTab === "Gallery" && (
            <motion.div
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {loading ? (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-gray-200 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-3 gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
                    },
                  }}
                >
                  {galleryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="overflow-hidden rounded-lg shadow cursor-pointer"
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { y: 0, opacity: 1 },
                      }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => console.log("Click", item.id)}
                    >
                      <Image
                        src={item.url}
                        alt={item.alt}
                        width={174}
                        height={167}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}
=======
      website="Visit website"
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-8.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-7.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Gallery")}
      
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="grid grid-cols-3 gap-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.7
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="rounded-lg overflow-hidden shadow-md"
            >
              <Image 
                src={item}
                alt={`Gallery ${index + 1}`}
                width={174}
                height={167}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </BaseProfile>
  );
};

<<<<<<< HEAD
export default UserProfileWithGallery;
=======
export default UserProfileWithGallery;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
