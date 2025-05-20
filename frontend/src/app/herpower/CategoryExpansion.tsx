import React from 'react';
import Image from 'next/image';

interface CardProps {
  id: string;
  image: string;
  members: number;
  description: string;
  title: string;
  category?: string;
}

interface CategoryExpansionProps {
  groups: CardProps[];
  categoryTitle: string;
  onBack: () => void;
}

const CategoryExpansion: React.FC<CategoryExpansionProps> = ({ 
  groups, 
  categoryTitle,
  onBack 
}) => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-4 border-b border-gray-100">
        <button className="p-2.5" onClick={onBack}>
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do-2.png" 
            alt="Back" 
            width={20} 
            height={20} 
          />
        </button>
        <span className="text-sm font-semibold text-[#141414] tracking-tight">
          {categoryTitle}
        </span>
        <div className="w-10" />
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {groups.map((group) => (
          <div 
            key={group.id}
            className="w-full bg-[#fcfdfe] rounded-lg border border-[#0000000f] overflow-hidden"
          >
            <div className="relative h-[148px]">
              <Image
                src={group.image}
                alt={group.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/50 to-transparent w-full">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium tracking-tight">
                    {group.title}
                  </span>
                  {group.category && (
                    <span className="text-sm font-normal tracking-tight text-[#f6f6f6]">
                      {group.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#212121] tracking-tight">
                {group.members} Members
              </span>
              <p className="text-sm text-[#212121] tracking-tight leading-[130%]">
                {group.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryExpansion;