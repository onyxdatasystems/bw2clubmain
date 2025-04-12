import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  imageUrl?: string;
  title?: string;
  date?: string;
  time?: string;
  description?: string;
  avatarUrl?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl = 'https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl.png',
  title = 'Empowering Hope: Brea...',
  date = '24th July, 2025',
  time = '10AM CAT',
  description = 'About event. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proine...',
  avatarUrl = 'https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/ellipse.png'
}) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg overflow-hidden shadow-md">
      {/* Top Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt="Event"
          fill
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative px-4 pt-8 pb-4 border border-[#e5e5e5]">
        {/* Avatar */}
        <div className="absolute -top-5 left-4">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={42}
            height={42}
            className="rounded-full"
          />
        </div>

        {/* Date and Time */}
        <div className="flex flex-row gap-6 mb-5">
          <div className="flex items-center gap-2">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/frame-48.png"
              alt="Calendar"
              width={10}
              height={11}
            />
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/frame-48-2.png"
              alt="Clock"
              width={11}
              height={11}
            />
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">{time}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-[#7171C1] tracking-[-0.5px] leading-[140%]">
            {title}
          </h3>
          <p className="text-[11px] text-[#292B32] tracking-[-0.41px] leading-[140%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

