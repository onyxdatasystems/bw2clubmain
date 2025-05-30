<<<<<<< HEAD
// components/HomePage.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page";         // <-- Point at your new Sidebar/index.tsx
import ArticleCard from "./ArticleCard";
import ArticleDetails from "./ArticleDetails";
import Footer from "./Footer";

const HomePage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-b from-[#f0f4f8] to-white"
=======
"use client"
import React from 'react';
import Navbar from '../Navbar/page';
import ArticleCard from './ArticleCard';
import ArticleDetails from './ArticleDetails';
import Footer from './Footer';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center w-full bg-gradient-to-b from-[#f0f4f8] to-[#ffffff] min-h-screen"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
<<<<<<< HEAD

      <div className="flex flex-1">
        {/* Sidebar always mounted */}
        <Sidebar joinedGroups={[{ id: "1", name: "Group A" }]} />

        {/* Main content: md:ml-64 to offset the 16rem‐wide sidebar */}
        <main className="flex-1 p-6 md:ml-64">
          <motion.div
            className="flex flex-col md:flex-row max-w-screen-lg mx-auto gap-8 mt-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 },
              },
            }}
          >
            <motion.div
              className="flex-grow"
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
            >
              <ArticleCard
                title="Small Acts, Big Impact"
                author="by Snezhana Stavre"
                description="Empowerment, resilience, achievement… When we hear these words, we..."
                imageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl.png"
                authorImageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse.png"
              />
            </motion.div>

            <motion.div
              className="flex-grow"
              variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
            >
              <ArticleCard
                title="The Healing"
                author="by John Doe"
                description="A story of self-discovery and growth..."
                imageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl-2.png"
                authorImageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse-2.png"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-screen-lg mx-auto py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ delay: 0.5 }}
          >
            <ArticleDetails
              title="Small Acts, Big Impact"
              content="Empowerment, resilience, achievement… When we hear these words, we immediately think of something 'big'..."
              author={{
                name: "Snezhana Stavre",
                image: "https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse-3.png",
              }}
              date="Apr 30, 2024"
              category="Triumph of Arts"
              language="English"
              likes={3}
              feedback={4}
              shares={2}
            />
          </motion.div>

          <Footer />
        </main>
      </div>
=======
      
      <motion.div 
        className="flex flex-col md:flex-row w-full max-w-screen-lg mt-8 px-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.div 
          className="flex-grow"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <ArticleCard 
            title="Small Acts, Big Impact"
            author="by Snezhana Stavre"
            description="Empowerment, resilience, achievement… When we hear these words, we..."
            imageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl.png"
            authorImageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse.png"
          />
        </motion.div>
        
        <motion.div 
          className="flex-grow"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <ArticleCard 
            title="The Healing"
            author="by John Doe"
            description="A story of self-discovery and growth..."
            imageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl-2.png"
            authorImageSrc="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse-2.png"
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        className="w-full py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ delay: 0.5 }}
      >
        <ArticleDetails 
          title="Small Acts, Big Impact"
          content="Empowerment, resilience, achievement… When we hear these words, we immediately think of something 'big'..."
          author={{ name: "Snezhana Stavre", image: "https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse-3.png" }}
          date="Apr 30, 2024"
          category="Triumph of Arts"
          language="English"
          likes={3}
          feedback={4}
          shares={2}
        />
      </motion.div>
      
      <Footer />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </motion.div>
  );
};

<<<<<<< HEAD
export default HomePage;
=======
export default HomePage;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
