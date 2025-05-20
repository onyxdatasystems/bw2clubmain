"use client";
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Tabs from './Tabs';
import Ads from './Ads';
import Link from 'next/link';

interface ProfileData {
  name: string;
  avatar: string;
  coverImage: string;
  work: string;
  education: string;
  dob: string;
  zodiac: string;
  language: string;
  supportBonds: ProfileBond[];
  photos: string[];
  videos: string[];
}

interface ProfileBond {
  name: string;
  avatar: string;
}

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState('Support Bonds');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token');
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [profileRes, photosRes, videosRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile_photos`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile_videos`, { headers })
        ]);

        if (!profileRes.ok || !photosRes.ok || !videosRes.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profile = await profileRes.json();
        const photos = await photosRes.json();
        const videos = await videosRes.json();

        setProfileData({
          ...profile.data,
          photos: photos.data || [],
          videos: videos.data || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const renderDetailItem = (icon: string, text: string, muted = false) => (
    <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
      <Image
        src={`/icons/${icon}.svg`}
        alt=""
        width={18}
        height={18}
      />
      <span className={muted ? "text-[#292b32b2]" : ""}>{text || 'Not specified'}</span>
    </motion.div>
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!profileData) return <div className="text-center p-8">No profile data found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      <div className="flex-grow">
        {/* Profile Header */}
        <motion.div
          className="w-full bg-white rounded-lg border border-[#ebecef] mb-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-full h-48 relative">
            <Image
              src={profileData.coverImage || '/default-cover.jpg'}
              alt="Profile background"
              fill
              sizes="100vw"
              className="object-cover rounded-t-lg"
              priority
            />
          </div>

          <div className="px-4 pb-4 relative">
            <motion.div className="absolute -top-14 left-4">
              <Image 
                src={profileData.avatar || '/default-avatar.png'}
=======
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

class ProfileBond {
  constructor(
    public name: string,
    public avatar: string
  ) {}
}

class ProfileSection_ProfilePosts extends React.Component<{ className?: string }> {
  private supportBonds: ProfileBond[] = [
    new ProfileBond('Alfredo Donin', 'https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-9.png'),
    new ProfileBond('Anika Ekstrom Bothman', 'https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-10.png'),
    // ... other bonds
  ];

  render() {
    return (
      <div className={`flex flex-col ${this.props.className}`}>
        {/* Profile Section */}
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] mb-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background Image */}
          <div className="w-full h-[121px] relative">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/rectangl-12.png"
              alt="Profile background"
              fill
              className="object-cover rounded-t-lg"
            />
          </div>

          {/* Profile Content */}
          <div className="px-4 pb-4 relative">
            {/* Avatar */}
            <motion.div 
              className="absolute -top-14 left-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/avatar-8.png"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                alt="Profile avatar"
                width={115}
                height={115}
                className="rounded-full border-4 border-white"
              />
            </motion.div>

<<<<<<< HEAD
            {/* Edit Profile Button */}
            <div className="absolute top-4 right-4">
              <Link href="/profileedit">
                <motion.button 
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src="/icons/edit.svg" 
                    alt="Edit" 
                    width={16} 
                    height={16} 
                  />
                  Edit Profile
                </motion.button>
              </Link>
            </div>
            <div className="mt-16">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h1 className="text-xl md:text-2xl font-semibold text-[#3a3a3a]">
                  {profileData.name}
                </h1>
                <div className="flex gap-3 items-center flex-wrap">
                  <motion.button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
=======
            {/* Profile Info */}
            <div className="mt-16">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h1 className="text-[20px] font-semibold text-[#3a3a3a] tracking-tight">
                  Ksenija Nikolova
                </h1>
                <div className="flex gap-3 items-center flex-wrap">
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  >
                    <span>Support</span>
                  </motion.button>
                  <motion.button 
<<<<<<< HEAD
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image src="/message-icon.png" alt="Message" width={16} height={16} />
                    <span>Buzz Me</span>
                  </motion.button>
                  <motion.button whileHover={{ rotate: 90 }}>
                    <Image src="/more-icon.png" alt="More" width={23} height={23} />
=======
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7171c1] text-[#7171c1] text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/paper-pl-8.png" alt="Message" width={16} height={16} />
                    <span>Buzz Me</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                  >
                    <Image src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/more-hor-6.png" alt="More" width={23} height={23} />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  </motion.button>
                </div>
              </div>

<<<<<<< HEAD
              <div className="flex flex-col gap-2.5 text-base text-[#292b32]">
                {renderDetailItem("work", profileData.work)}
                {renderDetailItem("education", profileData.education)}
                {renderDetailItem("dob", profileData.dob, true)}
                <div className="flex flex-col md:flex-row md:gap-24">
                  {renderDetailItem("zodiac", profileData.zodiac, true)}
                  {renderDetailItem("language", profileData.language, true)}
=======
              {/* Profile Details */}
              <div className="flex flex-col gap-2.5 text-base text-[#292b32]">
                {this.renderDetailItem("graduati-6.png", "Works as Founder at Better Women Better World")}
                {this.renderDetailItem("briefcas-11.png", "Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona")}
                {this.renderDetailItem("cake-1-6.png", "Born on August 2, 1988", true)}
                <div className="flex flex-col md:flex-row md:gap-24">
                  {this.renderDetailItem("leo-svgr-6.png", "Leo", true)}
                  {this.renderDetailItem("globe-2-6.png", "English", true)}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
<<<<<<< HEAD
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} className="mb-4" />

        {/* Content Sections */}
        {activeTab === 'Gallery' && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {profileData.photos.map((photo, index) => (
              <motion.div 
                key={`photo-${index}`}
                className="aspect-square relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={photo}
                  alt={`Gallery item ${index}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
            {profileData.videos.map((video, index) => (
              <motion.div 
                key={`video-${index}`}
                className="aspect-square relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <video 
                  src={video}
                  controls
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Support Bonds' && (
          <motion.div 
            className="bg-white rounded-lg border border-[#ebecef] divide-y divide-[#ebecef]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {profileData.supportBonds?.map((bond, index) => (
              <motion.div 
                key={index}
                className="flex items-center p-4"
                whileHover={{ backgroundColor: "#f6f6f6" }}
              >
                <div className="w-10 h-10 relative">
                  <Image 
                    src={bond.avatar} 
                    alt={bond.name} 
                    fill
                    sizes="40px"
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="flex-grow text-sm text-[#292b32] ml-4">
                  {bond.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="hidden lg:block lg:w-1/5">
        <Ads />
      </div>
    </div>
  );
};

export default ProfileSection;
=======
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] p-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
            {this.renderTab("About")}
            {this.renderTab("Board")}
            {this.renderTab("Gallery")}
            {this.renderTab("Support Bonds", true)}
          </div>
        </motion.div>

        {/* Support Bonds List */}
        <motion.div 
          className="w-full bg-white rounded-lg border border-[#ebecef] divide-y divide-[#ebecef]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {this.supportBonds.map((bond, index) => (
            <motion.div 
              key={index}
              className="flex items-center px-4 py-4"
              whileHover={{ backgroundColor: "#f6f6f6" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-[40px] h-[40px] relative">
                <Image 
                  src={bond.avatar} 
                  alt={bond.name} 
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <span className="flex-grow text-sm text-[#292b32] ml-4">{bond.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  private renderDetailItem(icon: string, text: string, muted = false) {
    return (
      <motion.div 
        className="flex items-center gap-2"
        whileHover={{ x: 5 }}
      >
        <Image 
          src={`https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/${icon}`} 
          alt="" 
          width={18} 
          height={18} 
        />
        <span className={muted ? "text-[#292b32b2]" : ""}>{text}</span>
      </motion.div>
    );
  }

  private renderTab(label: string, active = false) {
    return (
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <span className={`text-sm font-medium ${active ? 'text-[#7171C1]' : 'text-[#B2B2B2]'}`}>
          {label}
        </span>
        {active && (
          <motion.div 
            className="h-[2px] bg-[#7171C1] w-full"
            layoutId="underline"
          />
        )}
      </motion.div>
    );
  }
}

export default ProfileSection_ProfilePosts;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
