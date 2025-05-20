<<<<<<< HEAD
// Post.tsx
"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/hook';
import { deletePost, editPost } from '@/store/postsSlice';
import { reactionApi } from '../services/api';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import  {Post}  from '../../store/postsSlice';

interface PostComponentProps {
  post: Post;
  className?: string;
}



const PostComponent: React.FC<PostComponentProps> = ({ post, className }) => {

  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showOptions, setShowOptions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (postRef.current) {
      gsap.from(postRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1
      });
    }
  }, []);

  const handleDelete = async () => {
    if (postRef.current) {
      gsap.to(postRef.current, {
        opacity: 0,
        height: 0,
        marginBottom: 0,
        padding: 0,
        duration: 0.3,
        onComplete: () => {
          dispatch(deletePost(post.id));
        }
      });
    } else {
      dispatch(deletePost(post.id));
    }
  };

  const handleEdit = async () => {
    try {
      await dispatch(editPost({ id: post.id, data: { content: editedContent } }));
      setIsEditing(false);
      
      if (postRef.current) {
        gsap.to(postRef.current, {
          backgroundColor: "#f0f5ff",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleReaction = async (type: string) => {
    try {
      await reactionApi.react({ postId: post.id, type });
      // GSAP reaction animation
      if (postRef.current) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        postRef.current.appendChild(heart);

        gsap.fromTo(heart, 
          { scale: 0, opacity: 1 },
          { 
            scale: 1.5, 
            y: -50, 
            opacity: 0, 
            duration: 1.5,
            ease: "power1.out",
            onComplete: () => {
              postRef.current?.removeChild(heart);
            }
          }
        );
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const renderImages = () => {
    if (post.media.length === 0) return null;

    return (
      <div className="px-4 flex flex-col gap-1">
        {post.media[0] && (
          <motion.div whileHover={{ scale: 1.01 }}>
            <Image
              src={post.media[0]}
              alt="Main post image"
              width={514}
              height={214}
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        )}
        
        {post.media.length > 1 && (
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
            {post.media.slice(1, 4).map((img, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="flex-1"
              >
                {idx === 2 && post.media.length > 4 ? (
                  <div className="relative">
                    <Image
                      src={img}
                      alt={`Post image ${idx + 1}`}
                      width={168}
                      height={110}
                      className="rounded-lg brightness-50 w-full h-full object-cover"
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
                      +{post.media.length - 4}
                    </motion.span>
                  </div>
                ) : (
                  <Image
                    src={img}
                    alt={`Post image ${idx + 1}`}
                    width={168}
                    height={110}
                    className="rounded-lg w-full h-full object-cover"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  const renderReactions = () => {
=======
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

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    return (
      <motion.div 
        className="mt-4 border-t border-[#e5e5e5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="px-4 py-2 flex items-center gap-4">
<<<<<<< HEAD
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleReaction('cheers')}
          >
            <motion.button 
              className="hover:bg-gray-100 p-1 rounded"
              whileTap={{ scale: 0.9 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/like-but.png"
                alt="Cheers"
                width={24}
                height={24}
              />
            </motion.button>
            <span className="text-[12px] text-[#757575]">{post.reactions.cheers} Cheers</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowReactions(!showReactions)}
          >
            <motion.button 
              className="hover:bg-gray-100 p-1 rounded"
              whileTap={{ scale: 0.9 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/messages.png"
                alt="Feedback"
                width={24}
                height={24}
              />
            </motion.button>
            <span className="text-[12px] text-[#757575]">{post.reactions.feedback} Feedback</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleReaction('spread')}
          >
            <motion.button 
              className="hover:bg-gray-100 p-1 rounded"
              whileTap={{ scale: 0.9 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/share-sv.png"
                alt="Spread"
                width={24}
                height={24}
              />
            </motion.button>
            <span className="text-[12px] text-[#757575]">{post.reactions.spread} Spread</span>
          </motion.div>
        </div>

        {/* Feedback Input */}
        {showReactions && (
          <motion.div 
            className="p-4 border-t border-[#e5e5e5]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
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
        )}
      </motion.div>
    );
  };

  return (
    <motion.div 
      ref={postRef}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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
<<<<<<< HEAD
              src={post.author.avatar || "https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/avatar.png"}
=======
              src="https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/avatar.png"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <span className="text-[14px] text-[#292b32] font-normal">{post.author.name}</span>
            </div>
            <span className="text-[14px] text-[#636878]">
              {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className="relative">
          <motion.button 
            className="p-2 hover:bg-gray-100 rounded"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowOptions(!showOptions)}
          >
            <span className="text-lg">⋯</span>
          </motion.button>
          
          {showOptions && (
            <motion.div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
              >
                Edit Post
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleDelete}
              >
                Delete Post
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowOptions(false)}
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      </motion.div>

      {/* Post Content */}
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
<<<<<<< HEAD
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[14px] text-[#292b32] leading-[140%] mb-4">
            {post.content}
          </p>
        )}
      </motion.div>

      {renderImages()}
      {renderReactions()}
=======
        <p className="text-[14px] text-[#292b32] leading-[140%] mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in, ultrices mauris.
        </p>
      </motion.div>

      {post.renderImages()}
      {post.renderReactions()}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </motion.div>
  );
};

<<<<<<< HEAD
export default PostComponent;
=======
export default Post;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
