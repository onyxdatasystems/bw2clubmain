import React from 'react';
import Image from 'next/image';

interface CommunityHeaderProps {
  groupName?: string;
  isPrivate?: boolean;
  backgroundImage?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  groupName = "Planet Savers",
  isPrivate = true,
  backgroundImage = "https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/unsplash.png"
}) => {
  return (
    <div className="relative w-full max-w-[548.84px] h-[313.43px] overflow-hidden">
      <div className="relative w-full h-full">
        <Image 
          src={backgroundImage}
          alt="Community Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent to-[58.82%]" />
      </div>
      
      <div className="absolute bottom-4 left-4 flex flex-col">
        <h1 className="text-white text-xl font-medium tracking-[-0.5px] leading-[140%]">
          {groupName}
        </h1>
        <div className="flex items-center mt-2">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/lock-pas.png"
            alt="Private"
            width={11}
            height={12}
            className="mr-2"
          />
          <span className="text-white text-[10px] tracking-[-0.41px] leading-[140%]">
            {isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;

