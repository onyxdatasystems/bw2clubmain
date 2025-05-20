"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileSectionProps {
  userId?: string;
  name?: string;
  type?: string;
  location?: string;
  established?: string;
  websiteUrl?: string;
  avatarUrl?: string;
}

interface ProfileData {
  name: string;
  type: string;
  location: string;
  established: string;
  websiteUrl: string;
  avatarUrl: string;
  coverImageUrl: string;
  memberCount: number;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userId,
  name = "Better Women Better World",
  type = "Social Networking Platform",
  location = "Mid, Delaware",
  established = "Established on August 2, 2021",
  websiteUrl = "#",
  avatarUrl = "https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/avatar-5.png"
}) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleJoinCircle = async () => {
    try {
      await axios.post('/api/community/join', { userId });
      setIsMember(true);
    } catch (error) {
      console.error('Error joining circle:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[543px] w-full min-h-[355px] border border-[#ebecef] rounded-lg bg-white overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const displayData = profileData || {
    name,
    type,
    location,
    established,
    websiteUrl,
    avatarUrl,
    coverImageUrl: "https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/rectangl-3.png",
    memberCount: 1243
  };

  const profileDetails = [
    { icon: 'graduati-2.png', text: displayData.type },
    { icon: 'briefcas-3.png', text: displayData.location, muted: true },
    { icon: 'bookmark-2.png', text: displayData.established, muted: true },
    { icon: 'users-01.png', text: `${displayData.memberCount} members`, muted: true },
    { icon: 'globe-2-2.png', text: 'Visit website', link: displayData.websiteUrl, isLink: true }
  ];

  return (
    <motion.div 
      className="max-w-[543px] w-full min-h-[355px] border border-[#ebecef] rounded-lg bg-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Background Image */}
      <motion.div 
        className="w-full h-[121px] relative"
        whileHover={{ scale: 1.02 }}
      >
        <Image 
          src={displayData.coverImageUrl}
          alt="Profile Background"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Profile Content */}
      <div className="px-[18px] relative -mt-[76px]">
        {/* Avatar */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image 
            src={displayData.avatarUrl}
            alt="Profile Avatar"
            width={115}
            height={115}
            className="rounded-full border-4 border-white"
          />
        </motion.div>

        {/* Header Section */}
        <motion.div 
          className="flex justify-between items-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 
            className="text-[20px] font-semibold text-[#3a3a3a] leading-6"
            whileHover={{ color: '#7171c1' }}
          >
            {displayData.name}
          </motion.h1>
          <motion.button 
            className="w-6 h-6"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/more-hor-2.png"
              alt="More options"
              width={23}
              height={23}
            />
          </motion.button>
        </motion.div>

        {/* Details Section */}
        <motion.div 
          className="mt-8 space-y-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {profileDetails.map((detail, index) => (
            <motion.div 
              key={index}
              className="flex items-center gap-2"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Image 
                src={`https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/${detail.icon}`}
                alt={detail.text}
                width={18}
                height={18}
              />
              {detail.isLink ? (
                <Link href={detail.link} passHref>
                  <motion.span 
                    className="text-base text-[#7171c1] hover:underline"
                    whileHover={{ scale: 1.02 }}
                  >
                    {detail.text}
                  </motion.span>
                </Link>
              ) : (
                <span className={`text-base ${detail.muted ? 'text-[#292b32]/70' : 'text-[#292b32]'}`}>
                  {detail.text}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Join Button */}
        <motion.button 
          className="mt-8 px-[9px] py-[3px] bg-gradient-to-b from-[#8585D5] to-[#6767B7] rounded-full"
          whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(103, 103, 183, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleJoinCircle}
          disabled={isMember}
        >
          <span className="text-[11.5px] font-medium text-white tracking-tight">
            {isMember ? 'Joined' : 'Join Circle'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileSection;