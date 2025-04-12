import React from 'react';
import Image from 'next/image';

interface ProfileEngagementStatsProps {
  posts?: number;
  members?: number;
}

const ProfileEngagementStats: React.FC<ProfileEngagementStatsProps> = ({
  posts = 0,
  members = 1
}) => {
  return (
    <div className="flex justify-between items-center w-full max-w-[548.84px] p-4 bg-white">
      <div className="flex gap-5">
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-[16px] font-semibold leading-[24px] text-[#292b32]">
            {posts}
          </span>
          <span className="text-[14px] leading-[140%] text-[#898e9e]">
            posts
          </span>
        </div>
        <div className="h-[22px] w-[1px] bg-[#e5e5e5] my-auto" />
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-[16px] font-semibold leading-[24px] text-[#292b32]">
            {members}
          </span>
          <span className="text-[14px] leading-[140%] text-[#898e9e]">
            members
          </span>
        </div>
      </div>
      <div className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/frame-20.png"
          alt="More options"
          width={15}
          height={4}
        />
      </div>
    </div>
  );
};

export default ProfileEngagementStats;

