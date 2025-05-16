import React from 'react';
import Image from 'next/image';

interface TrendingCardProps {
  imageSrc: string;
  badgeIcon: string;
  title: string;
  description: string;
  category: string;
  members: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  imageSrc,
  badgeIcon,
  title,
  description,
  category,
  members
}) => {
  return (
    <div className="w-[220px] h-[356px] bg-[#fcfdfe] rounded-[10px] border border-[#0000000f] flex flex-col">
      <Image 
        src={imageSrc}
        alt={title}
        width={220}
        height={211}
        className="rounded-t-[10px]"
      />
      <div className="p-4 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <span className="text-[14px] font-medium tracking-[-0.5px] text-[#141414]">{title}</span>
          <Image src={badgeIcon} alt="badge" width={18} height={18} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium tracking-[-0.5px] text-[#747474]">
            {category}. {members} members
          </span>
          <p className="text-[14px] leading-[130%] tracking-[-0.6px] text-[#212121]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const TrendingSection: React.FC = () => {
  const trendingData = [
    {
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-5.png',
      badgeIcon: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-5.png',
      title: '01 Sisterhood',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more',
      category: 'K-POP',
      members: '15k'
    },
    {
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-6.png',
      badgeIcon: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-6.png',
      title: '01 Sisterhood',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more',
      category: 'K-POP',
      members: '15k'
    },
    {
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-7.png',
      badgeIcon: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-7.png',
      title: '01 Sisterhood',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more',
      category: 'K-POP',
      members: '15k'
    },
    {
      imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-8.png',
      badgeIcon: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-8.png',
      title: '01 Sisterhood',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more',
      category: 'K-POP',
      members: '15k'
    }
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
        Top Trending
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {trendingData.map((card, index) => (
          <TrendingCard
            key={index}
            {...card}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;

