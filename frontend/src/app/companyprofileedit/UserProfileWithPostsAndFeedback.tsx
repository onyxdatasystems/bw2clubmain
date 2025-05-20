<<<<<<< HEAD
// components/Feedback.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

interface FeedbackItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  comment: string;
  rating: number;
  date: string;
}

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: '/avatars/avatar-1.png',
        role: 'CEO at TechCorp'
      },
      comment: 'The platform has been incredibly useful for our team. The interface is intuitive and the features are exactly what we needed to streamline our workflow.',
      rating: 5,
      date: '2 days ago'
    },
    {
      id: '2',
      user: {
        name: 'Michael Chen',
        avatar: '/avatars/avatar-2.png',
        role: 'Product Manager'
      },
      comment: 'Good overall experience, but there are some minor bugs that need fixing. Customer support was responsive when we reported issues.',
      rating: 4,
      date: '1 week ago'
    }
  ]);

  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!newFeedback.trim() || rating === 0) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newItem: FeedbackItem = {
        id: Date.now().toString(),
        user: {
          name: 'Current User',
          avatar: '/avatars/current-user.png',
          role: 'Member'
        },
        comment: newFeedback,
        rating,
        date: 'Just now'
      };

      setFeedback([newItem, ...feedback]);
      setNewFeedback('');
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg border border-[#ebecef] p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-[#3a3a3a] mb-6">Feedback</h2>
      
      {/* Feedback Form */}
      <motion.div 
        className="mb-8 p-4 bg-gray-50 rounded-lg"
        whileHover={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.05)" }}
      >
        <h3 className="text-sm font-medium text-[#3a3a3a] mb-3">Leave your feedback</h3>
        <textarea
          className="w-full p-3 border border-[#ebecef] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#7171c1] focus:border-transparent mb-3"
          rows={3}
          placeholder="Share your thoughts..."
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
              >
                <Image 
                  src={star <= rating ? "/icons/star-filled.svg" : "/icons/star.svg"}
                  alt={`Rate ${star} star`}
                  width={24}
                  height={24}
                />
              </motion.button>
            ))}
          </div>
          
          <motion.button
            className="px-4 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitFeedback}
            disabled={isSubmitting || !newFeedback.trim() || rating === 0}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </div>
      </motion.div>
      
      {/* Feedback List */}
      <div className="space-y-6">
        {feedback.map((item) => (
          <motion.div 
            key={item.id}
            className="border-b border-[#ebecef] pb-6 last:border-0 last:pb-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4 mb-3">
              <Image 
                src={item.user.avatar}
                alt={item.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h4 className="font-medium text-[#3a3a3a]">{item.user.name}</h4>
                <p className="text-xs text-[#636878]">{item.user.role}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image 
                    key={star}
                    src={star <= item.rating ? "/icons/star-filled.svg" : "/icons/star.svg"}
                    alt={`${star} star`}
                    width={16}
                    height={16}
                  />
                ))}
                <span className="text-xs text-[#636878] ml-1">{item.date}</span>
              </div>
            </div>
            <p className="text-sm text-[#3a3a3a] pl-14">{item.comment}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feedback;
=======
// components/UserProfileWithPostsAndFeedback.tsx
"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithPostsAndFeedback: React.FC = () => {
  return (
    <BaseProfile
      name="Better Women Better World"
      role="Social Networking Platform"
      location="Mid, Delaware"
      establishedDate="Established on August 2, 2021"
      website="Visit website"
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-5.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-3.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Board")}
      
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Post Composer */}
        <motion.div 
          className="border border-[#ebecef] rounded-lg p-4 bg-white shadow-sm"
          whileHover={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex gap-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-[#fa53f7] overflow-hidden"
              whileHover={{ rotate: 5 }}
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/asset.png"
                alt="User"
                width={40}
                height={40}
              />
            </motion.div>
            <div className="flex-1">
              <motion.input 
                type="text" 
                placeholder="What's going on..." 
                className="w-full p-3 border border-[#ebecef] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#7171c1] focus:border-transparent"
                whileFocus={{ scale: 1.01 }}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  {["image", "video", "attachment"].map((type, index) => (
                    <motion.button
                      key={type}
                      className="w-8 h-8 bg-[#ebecef] rounded-full opacity-60 flex items-center justify-center"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image 
                        src={`https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/${type}.png`}
                        alt={type}
                        width={24}
                        height={24}
                      />
                    </motion.button>
                  ))}
                </div>
                <motion.button 
                  className="px-3 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post Example */}
        <motion.div 
          className="border border-[#ebecef] rounded-lg bg-white shadow-sm overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ y: -3 }}
        >
          {/* Post content */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <motion.div whileHover={{ rotate: 5 }}>
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-6.png" 
                  alt="Post author" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              </motion.div>
              <div>
                <h3 className="font-normal text-sm">Jackie Jonnes</h3>
                <span className="text-sm text-[#636878]">30 mins</span>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90 }}>
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/frame-20.png" 
                alt="More" 
                width={15} 
                height={4} 
              />
            </motion.button>
          </div>
          
          <div className="px-4 pb-4">
            <p className="text-sm text-[#292b32]">
              Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. 
              Fusce vulputate odio varius, lacinia nisi in,...Read more
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/1-image.png" 
              alt="Post image" 
              width={512} 
              height={327} 
              className="w-full"
            />
          </motion.div>

          {/* Post interactions */}
          <motion.div 
            className="border-t border-[#e5e5e5] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* ... rest of the post interactions ... */}
          </motion.div>
        </motion.div>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithPostsAndFeedback;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
