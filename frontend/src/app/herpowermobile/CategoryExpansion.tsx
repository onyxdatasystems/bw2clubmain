import React from 'react';
import Image from 'next/image';

interface CardProps {
  image: string;
  members: number;
  description: string;
}

const CategoryExpansion: React.FC = () => {
  const cards: CardProps[] = [
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-9.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-10.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-11.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-12.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-13.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-14.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-15.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    },
    {
      image: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/rectangl-16.png',
      members: 123,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te... See more'
    }
  ];

  return (
    <div className="w-full max-w-md bg-white">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-4 border-b border-gray-100">
        <button className="p-2.5">
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do-2.png" alt="Back" width={20} height={20} />
        </button>
        <span className="text-sm font-semibold text-[#141414] tracking-tight">Sports</span>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Cards Container */}
      <div className="flex flex-col gap-6 p-4">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="w-full bg-[#fcfdfe] rounded-lg border border-[#0000000f] overflow-hidden"
          >
            <div className="relative h-[148px]">
              <Image
                src={card.image}
                alt="Category"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/50 to-transparent w-full">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium tracking-tight">Skiing</span>
                  <span className="text-sm font-normal tracking-tight text-[#f6f6f6]">Lifestyle</span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#212121] tracking-tight">
                {card.members} Members
              </span>
              <p className="text-sm text-[#212121] tracking-tight leading-[130%]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryExpansion;

