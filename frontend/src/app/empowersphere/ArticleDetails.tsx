"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Article Details Service
class ArticleDetailsService {
  constructor(
    public title: string,
    public content: string,
    public author: { name: string; image: string },
    public date: string,
    public category: string,
    public language: string,
    public likes: number,
    public feedback: number,
    public shares: number
  ) {}

  renderHeaderImage() {
    return (
      <motion.div 
        className="w-full h-auto rounded-[10px] overflow-hidden mb-8 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl-3.png"
          alt="Article header"
          width={598}
          height={455}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  renderAuthorSection() {
    return (
      <motion.div 
        className="flex flex-col items-end w-full max-w-[652px]"
        whileHover={{ backgroundColor: "#f9f9f9" }}
      >
        <motion.div 
          className="text-[18px] font-inter text-[#292b32] mb-2"
          whileHover={{ scale: 1.02 }}
        >
          Author: {this.author.name}
        </motion.div>
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          className="rounded-full overflow-hidden border-2 border-white shadow-lg"
        >
          <Image 
            src={this.author.image}
            alt={this.author.name}
            width={144}
            height={144}
          />
        </motion.div>
      </motion.div>
    );
  }

  renderInteractionButtons() {
    const interactions = [
      { icon: "like-but.png", label: `${this.likes} Cheers`, alt: "Like" },
      { icon: "messages.png", label: `${this.feedback} Feedback`, alt: "Feedback" },
      { icon: "share-sv.png", label: `${this.shares} Spread`, alt: "Share" }
    ];

    return (
      <motion.div 
        className="flex gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {interactions.map((interaction, idx) => (
          <motion.button
            key={idx}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "#7171c1" }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Image 
              src={`https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/${interaction.icon}`} 
              alt={interaction.alt} 
              width={28} 
              height={28} 
            />
            <span className="text-[14px] text-[#757575]">{interaction.label}</span>
          </motion.button>
        ))}
      </motion.div>
    );
  }
}

interface ArticleDetailsProps {
  title?: string;
  content?: string;
  author?: {
    name: string;
    image: string;
  };
  date?: string;
  category?: string;
  language?: string;
  likes?: number;
  feedback?: number;
  shares?: number;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({
  title = "Small Acts, Big Impact",
  content = "Empowerment, resilience, achievement… When we hear these words, we immediately think of something \"big\"...",
  author = {
    name: "Snezhana Stavre",
    image: "https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse-3.png"
  },
  date = "Apr 30, 2024",
  category = "Triumph of Arts",
  language = "English",
  likes = 3,
  feedback = 4,
  shares = 2
}) => {
  const article = new ArticleDetailsService(
    title, content, author, date, category, language, likes, feedback, shares
  );

  return (
    <motion.div 
      className="flex flex-col items-center w-full max-w-[816px] bg-white mx-auto p-8 shadow-lg rounded-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5 }}
    >
      {article.renderHeaderImage()}

      <motion.h1 
        className="text-[32px] font-inter font-medium text-[#636878] mb-4 text-center"
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h1>

      <motion.div 
        className="text-[16px] font-inter text-[#636878] mb-8 text-center"
        whileHover={{ backgroundColor: "#f9f9f9" }}
      >
        {date} — in {category}<br />
        Language: {language}
      </motion.div>

      <motion.div 
        className="text-[18px] font-inter leading-[150%] text-[#292b32] mb-8 max-w-[652px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {content}
      </motion.div>

      {article.renderAuthorSection()}

      <motion.div 
        className="w-full max-w-[652px] mt-8 border-t border-[#e5e5e5] pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center">
          {article.renderInteractionButtons()}
          
          <motion.button 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "#7171c1" }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/group-26.png" 
              alt="Copy link" 
              width={32} 
              height={32} 
            />
            <span className="text-[15px] font-semibold text-[#757575]">Copy link</span>
          </motion.button>
        </div>

        <motion.div 
          className="flex mt-4 gap-4 items-center"
          whileHover={{ scale: 1.01 }}
        >
          <input
            type="text"
            placeholder="Enter Feedback"
            className="flex-1 h-[57px] rounded-[12px] bg-[#fafafa] border border-[#7171c1] px-4 focus:ring-2 focus:ring-[#7171c1] outline-none transition-all"
          />
          <motion.button 
            className="w-[24px] h-[24px]"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/paper-pl.png"
              alt="Send"
              width={24}
              height={24}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ArticleDetails;