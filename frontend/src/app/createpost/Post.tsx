"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Post Component with enhanced animations
class PostComponent {
  constructor(
    public className: string = ''
  ) {}

  renderImages() {
    const images = [
      { src: "top.png", alt: "Main post image", width: 514, height: 214 },
      { src: "unsplash-10.png", alt: "Additional image 1", width: 168, height: 110 },
      { src: "unsplash-11.png", alt: "Additional image 2", width: 168, height: 110 },
      { src: "unsplash-12.png", alt: "Additional image 3", width: 168, height: 110 }
    ];

    return (
      <div className="px-4 flex flex-col gap-1">
        <motion.div whileHover={{ scale: 1.01 }}>
          <Image
            src={`https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/${images[0].src}`}
            alt={images[0].alt}
            width={images[0].width}
            height={images[0].height}
            className="rounded-lg"
          />
        </motion.div>
        
        <motion.div 
          className="flex gap-1 mt-1"
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
          {images.slice(1).map((img, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              {idx === 3 ? (
                <div className="relative">
                  <Image
                    src={`https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/${img.src}`}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="rounded-lg brightness-50"
                  />
                  <motion.span 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    +5
                  </motion.span>
                </div>
              ) : (
                <Image
                  src={`https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/${img.src}`}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="rounded-lg"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  renderReactions() {
    const reactions = [
      { icon: "like-but.png", label: "3 Cheers", alt: "Like" },
      { icon: "messages.png", label: "4 Feedback", alt: "Comment" },
      { icon: "share-sv.png", label: "2 Spread", alt: "Share" }
    ];

    return (
      <motion.div 
        className="mt-4 border-t border-[#e5e5e5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="px-4 py-2 flex items-center gap-4">
          {reactions.map((reaction, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.button 
                className="hover:bg-gray-100 p-1 rounded"
                whileTap={{ scale: 0.9 }}
              >
                <Image 
                  src={`https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/${reaction.icon}`}
                  alt={reaction.alt}
                  width={24}
                  height={24}
                />
              </motion.button>
              <span className="text-[12px] text-[#757575]">{reaction.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Feedback Input */}
        <motion.div 
          className="p-4 border-t border-[#e5e5e5]"
          whileHover={{ backgroundColor: "#f9f9f9" }}
        >
          <div className="flex items-center gap-2 bg-[#fafafa] rounded-lg border border-[#7171c1] p-2">
            <input
              type="text"
              placeholder="Enter Feedback"
              className="flex-grow bg-transparent outline-none text-sm text-[#636878]"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/paper-pl.png" 
                alt="Send" 
                width={20} 
                height={20} 
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

interface PostProps {
  className?: string;
}

const Post: React.FC<PostProps> = ({ className = '' }) => {
  const post = new PostComponent(className);

  return (
    <motion.div 
      className={`flex flex-col w-full max-w-[546px] bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
    >
      {/* User Info */}
      <motion.div 
        className="flex items-center justify-between p-4 border-b"
        whileHover={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ rotate: 5 }}>
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/avatar.png"
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-[#292b32] font-normal">Jackie Jonnes</span>
              <span className="text-[12px] text-[#a5a9b5]">ban</span>
            </div>
            <span className="text-[14px] text-[#636878]">30 mins</span>
          </div>
        </div>
        <motion.button 
          className="p-2 hover:bg-gray-100 rounded"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-lg">⋯</span>
        </motion.button>
      </motion.div>

      {/* Post Content */}
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[14px] text-[#292b32] leading-[140%] mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in, ultrices mauris.
        </p>
      </motion.div>

      {post.renderImages()}
      {post.renderReactions()}
    </motion.div>
  );
};

export default Post;