import React from 'react';
import Image from 'next/image';

interface RecommendCard {
  id: string;
  image: string;
  badge?: string;
  title: string;
  members: number;
  description: string;
  category?: string;
}

interface RecommendedSectionProps {
  groups: RecommendCard[];
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ groups }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
        Recommended for You
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {groups.map((group) => (
          <div 
            key={group.id}
            className="min-w-[220px] h-[326px] bg-[#fcfdfe] rounded-[10px] border border-[#0000000f] flex flex-col"
          >
            <div className="relative w-[220px] h-[211px]">
              <Image
                src={group.image}
                alt={group.title}
                fill
                className="rounded-t-[10px] object-cover"
              />
              <div className="absolute bottom-0 left-4 flex flex-col gap-1.5 mb-6">
                <div className="flex flex-row gap-1">
                  <span className="text-[14px] font-medium tracking-[-0.5px] text-white">
                    {group.title}
                  </span>
                  {group.badge && (
                    <Image
                      src={group.badge}
                      alt="badge"
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                {group.category && (
                  <span className="text-[14px] font-normal tracking-[-0.6px] text-[#f6f6f6]">
                    {group.category}
                  </span>
                )}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <span className="text-[12px] font-medium tracking-[-0.5px] text-[#212121]">
                {group.members} Members
              </span>
              <p className="text-[14px] font-normal tracking-[-0.6px] leading-[130%] text-[#212121]">
                {group.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;