<<<<<<< HEAD
// PostCompose.tsx
"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/hook';
import { createPost } from '@/store/postsSlice';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

interface PostComposeProps {
  className?: string;
}

const PostCompose: React.FC<PostComposeProps> = ({ className = '' }) => {
<<<<<<< HEAD
  const dispatch = useAppDispatch();
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() && media.length === 0) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('content', postText);
      media.forEach(file => formData.append('media', file));

      await dispatch(createPost(formData));
      setPostText('');
      setMedia([]);
      
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          backgroundColor: "#f0fff0",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          backgroundColor: "#fff0f0",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMedia(prev => [...prev, ...files]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      ref={containerRef}
      className={`flex flex-row p-4 bg-white rounded-lg border border-[#ebecef] min-w-[300px] md:min-w-[515px] shadow-sm ${className}`}
=======
  const [postText, setPostText] = useState('');
  const composer = new PostComposer(className);

  return (
    <motion.div
      className={`flex flex-row p-4 bg-white rounded-lg border border-[#ebecef] min-w-[300px] md:min-w-[515px] shadow-sm ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      whileHover={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div 
        className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
        whileHover={{ rotate: 5 }}
      >
        <Image 
<<<<<<< HEAD
          src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/asset-2.png"
          alt="Avatar"
          width={40}
          height={40}
=======
          src={composer.avatarUrl}
          alt="Avatar"
          fill
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          className="object-cover"
        />
      </motion.div>

      <div className="flex flex-col flex-grow ml-4 gap-3">
<<<<<<< HEAD
        <form onSubmit={handleSubmit}>
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

          {/* Media preview */}
          {media.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {media.map((file, index) => (
                <motion.div
                  key={index}
                  className="relative w-20 h-20 rounded-md overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2">
              <label className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaChange}
                  className="hidden"
                />
                <Image
                  src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/image-3.png"
                  alt="Add media"
                  width={20}
                  height={20}
                />
              </label>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center"
              >
                <Image
                  src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/play-circ-3.png"
                  alt="Add video"
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center"
              >
                <Image
                  src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/papercli-3.png"
                  alt="Add attachment"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <motion.button 
              className="px-4 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full text-sm font-medium"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(103, 103, 183, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              disabled={(!postText.trim() && media.length === 0) || isSubmitting}
              animate={{
                opacity: (!postText.trim() && media.length === 0) ? 0.7 : 1,
                scale: (!postText.trim() && media.length === 0) ? 0.98 : 1
              }}
              type="submit"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </motion.button>
          </div>
        </form>
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      </div>
    </motion.div>
  );
};

export default PostCompose;