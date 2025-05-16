import React from 'react';
import Image from 'next/image';

interface RecommendCard {
  image: string;
  badge: string;
  title: string;
  members: number;
  description: string;
}

const defaultCards: RecommendCard[] = [
  {
    image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl.png',
    badge: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges.png',
    title: 'Teletubby',
    members: 123,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
  },
  {
    image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-2.png',
    badge: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-2.png',
    title: 'Teletubby',
    members: 123,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
  },
  {
    image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-3.png',
    badge: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-3.png',
    title: 'Teletubby',
    members: 123,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
  },
  {
    image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-4.png',
    badge: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/badges-4.png',
    title: 'Teletubby',
    members: 123,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
  }
];

interface RecommendedSectionProps {
  cards?: RecommendCard[];
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ cards = defaultCards }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
        Recommended for You
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="min-w-[220px] h-[326px] bg-[#fcfdfe] rounded-[10px] border border-[#0000000f] flex flex-col"
          >
            <div className="relative w-[220px] h-[211px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="rounded-t-[10px] object-cover"
              />
              <div className="absolute bottom-0 left-4 flex flex-col gap-1.5 mb-6">
                <div className="flex flex-row gap-1">
                  <span className="text-[14px] font-medium tracking-[-0.5px] text-white">
                    {card.title}
                  </span>
                  <Image
                    src={card.badge}
                    alt="badge"
                    width={18}
                    height={18}
                  />
                </div>
                <span className="text-[14px] font-normal tracking-[-0.6px] text-[#f6f6f6]">
                  TV Show
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <span className="text-[12px] font-medium tracking-[-0.5px] text-[#212121]">
                {card.members} Members
              </span>
              <p className="text-[14px] font-normal tracking-[-0.6px] leading-[130%] text-[#212121]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;

