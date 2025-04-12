"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Base Article Component with OOP and animations
class BaseArticle {
  constructor(
    public title: string,
    public author: string,
    public description: string,
    public imageSrc: string,
    public authorImageSrc: string
  ) {}

  renderImage() {
    return (
      <motion.div 
        className="w-full h-[322px] relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Image
          src={this.imageSrc}
          alt={this.title}
          fill
          className="object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"
        />
      </motion.div>
    );
  }

  renderAuthor() {
    return (
      <motion.div 
        className="w-[70px] h-[70px] relative rounded-full overflow-hidden border-2 border-white shadow-lg"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={this.authorImageSrc}
          alt={this.author}
          fill
          className="object-cover"
        />
      </motion.div>
    );
  }
}

interface ArticleCardProps {
  title?: string;
  author?: string;
  description?: string;
  imageSrc?: string;
  authorImageSrc?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title = "Small Acts, Big Impact",
  author = "by Snezhana Stavre",
  description = "Empowerment, resilience, achievement… When we hear these words, we...",
  imageSrc = "https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/rectangl.png",
  authorImageSrc = "https://dashboard.codeparrot.ai/api/image/Z-z_Zgz4-w8v6R9r/ellipse.png"
}) => {
  const article = new BaseArticle(title, author, description, imageSrc, authorImageSrc);

  return (
    <motion.div
      className="w-full max-w-[432px] h-auto flex flex-col overflow-hidden bg-white border border-[#e5e5e5] rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      whileHover={{ 
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
        y: -5
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {article.renderImage()}

      <motion.div 
        className="p-6 flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {article.renderAuthor()}

        <motion.h2 
          className="text-[32px] text-[#636878] font-medium leading-[140%] tracking-[-0.5px]"
          whileHover={{ color: "#7171c1" }}
        >
          {title}
        </motion.h2>

        <motion.p 
          className="text-lg text-[#292b32] leading-[140%] tracking-[-0.07px]"
          whileHover={{ scale: 1.01 }}
        >
          {description}
        </motion.p>

        <motion.p 
          className="text-base text-[#292b32] font-medium leading-[140%] tracking-[-0.5px] text-right"
          whileHover={{ x: 5 }}
        >
          {author}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ArticleCard;