"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// PostComposer with enhanced interactions
class PostComposer {
  constructor(
    public className: string = '',
    public avatarUrl: string = "https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/asset-2.png"
  ) {}

  renderAttachmentButtons() {
    const attachments = [
      { icon: "image-3.png", alt: "Image" },
      { icon: "play-circ-3.png", alt: "Video" },
      { icon: "papercli-3.png", alt: "Attachment" }
    ];

    return (
      <div className="flex gap-2">
        {attachments.map((item, idx) => (
          <motion.button
            key={idx}
            className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(90, 103, 216, 0.1)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src={`https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/${item.icon}`}
              alt={item.alt}
              width={20}
              height={20}
            />
          </motion.button>
        ))}
      </div>
    );
  }
}

interface PostComposeProps {
  className?: string;
}

const PostCompose: React.FC<PostComposeProps> = ({ className = '' }) => {
  const [postText, setPostText] = useState('');
  const composer = new PostComposer(className);

  return (
    <motion.div
      className={`flex flex-row p-4 bg-white rounded-lg border border-[#ebecef] min-w-[300px] md:min-w-[515px] shadow-sm ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div 
        className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
        whileHover={{ rotate: 5 }}
      >
        <Image 
          src={composer.avatarUrl}
          alt="Avatar"
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="flex flex-col flex-grow ml-4 gap-3">
        <motion.div 
          className="border border-[#ebecef] rounded p-3.5"
          whileFocus={{ borderColor: "#5A67D8", boxShadow: "0 0 0 1px #5A67D8" }}
        >
          <textarea
            placeholder="What's going on..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full min-h-[20px] resize-none outline-none text-sm text-[#292b32] placeholder-[#898e9e] font-inter"
          />
        </motion.div>

        <div className="flex justify-between items-center">
          {composer.renderAttachmentButtons()}

          <motion.button 
            className="px-4 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full text-sm font-medium"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 4px 10px rgba(103, 103, 183, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            disabled={!postText}
            animate={{
              opacity: postText ? 1 : 0.7,
              scale: postText ? 1 : 0.98
            }}
          >
            Post
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCompose;