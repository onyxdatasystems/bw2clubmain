import React from 'react';
import Image from 'next/image';

interface TrendingCardProps {
  id: string;
  image: string;  // Changed from imageSrc to match your data structure
  badge?: string; // Changed from badgeIcon to match your data structure
  title: string;
  description: string;
  category?: string;
  members: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  image,       // Changed from imageSrc
  badge,       // Changed from badgeIcon
  title,
  description,
  category,
  members
}) => {
  return (
    <div className="w-[220px] h-[356px] bg-[#fcfdfe] rounded-[10px] border border-[#0000000f] flex flex-col">
      <Image 
        src={image}  // Changed from imageSrc
        alt={title}
        width={220}
        height={211}
        className="rounded-t-[10px] object-cover"
      />
      <div className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <span className="text-[14px] font-medium tracking-[-0.5px] text-[#141414]">
            {title}
          </span>
          {badge && (  // Changed from badgeIcon
            <Image src={badge} alt="badge" width={18} height={18} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {category && (
            <span className="text-[12px] font-medium tracking-[-0.5px] text-[#747474]">
              {category}. {members.toLocaleString()} members
            </span>
          )}
          <p className="text-[14px] leading-[130%] tracking-[-0.6px] text-[#212121]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface TrendingSectionProps {
  groups: TrendingCardProps[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ groups }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
        Top Trending
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {groups.map((group) => (
          <TrendingCard
            key={group.id}
            {...group}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;