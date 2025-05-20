<<<<<<< HEAD
// components/EventCard.tsx
=======
// EventCard.tsx
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  id: string;
<<<<<<< HEAD
=======
  imageUrl: string;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  title: string;
  date: string;
  time: string;
  description: string;
<<<<<<< HEAD
  imageUrl: string;
  avatarUrl: string;
  status?: 'going' | 'notgoing' | 'interested' | 'notinterested';
  onAction: (actionType: string, id: string) => Promise<void>;
  onInvite: () => void;
=======
  avatarUrl: string;
  status?: 'going' | 'notgoing' | 'interested' | 'notinterested';
  onAction: (action: string, id: string) => void;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  imageUrl,
  title,
  date,
  time,
  description,
  avatarUrl,
  status,
<<<<<<< HEAD
  onAction,
}) => {
  return (
    <div className="w-full sm:max-w-xs bg-white rounded-lg overflow-hidden shadow-md">
      <Link href={`/event/view/${id}`}>
        <div className="relative h-48 w-full cursor-pointer">
          <Image src={imageUrl} alt="Event" fill className="object-cover" />
=======
  onAction
}) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg overflow-hidden shadow-md">
      <Link href={`https://bw2club.onyxdatasystems.com/backend/api/v1/events_details/${id}`}>
        <div className="relative h-48 w-full cursor-pointer">
          <Image
            src={imageUrl}
            alt="Event"
            fill
            className="object-cover"
          />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        </div>
      </Link>

      <div className="relative px-4 pt-8 pb-4 border border-[#e5e5e5]">
        <div className="absolute -top-5 left-4">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={42}
            height={42}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-row gap-6 mb-5">
          <div className="flex items-center gap-2">
            <Image
<<<<<<< HEAD
              src="/icons/calendar.svg"
=======
              src="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/frame-48.png"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              alt="Calendar"
              width={10}
              height={11}
            />
<<<<<<< HEAD
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">
              {date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/clock.svg"
=======
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/frame-48-2.png"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              alt="Clock"
              width={11}
              height={11}
            />
<<<<<<< HEAD
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">
              {time}
            </span>
=======
            <span className="text-[10px] text-[#7171C1] tracking-[-0.41px]">{time}</span>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          </div>
        </div>

        <div className="flex flex-col gap-2">
<<<<<<< HEAD
          <h3 className="text-sm sm:text-base font-medium text-[#7171C1] tracking-[-0.5px] leading-[140%]">
            {title}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#292B32] tracking-[-0.41px] leading-[140%]">
=======
          <h3 className="text-base font-medium text-[#7171C1] tracking-[-0.5px] leading-[140%]">
            {title}
          </h3>
          <p className="text-[11px] text-[#292B32] tracking-[-0.41px] leading-[140%]">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
<<<<<<< HEAD
            onClick={() => onAction('event/going', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'going'
                ? 'bg-green-500 text-white'
=======
            onClick={() => onAction('https://bw2club.onyxdatasystems.com/backend/api/v1/event_going', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'going' 
                ? 'bg-green-500 text-white' 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Going
          </button>
          <button
<<<<<<< HEAD
            onClick={() => onAction('event/notgoing', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'notgoing'
                ? 'bg-red-500 text-white'
=======
            onClick={() => onAction('https://bw2club.onyxdatasystems.com/backend/api/v1/event_notgoing', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'notgoing' 
                ? 'bg-red-500 text-white' 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Not Going
          </button>
          <button
<<<<<<< HEAD
            onClick={() => onAction('event/interested', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'interested'
                ? 'bg-blue-500 text-white'
=======
            onClick={() => onAction('https://bw2club.onyxdatasystems.com/backend/api/v1/event_interested', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'interested' 
                ? 'bg-blue-500 text-white' 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Interested
          </button>
          <button
<<<<<<< HEAD
            onClick={() => onAction('event/notinterested', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'notinterested'
                ? 'bg-yellow-500 text-white'
=======
            onClick={() => onAction('https://bw2club.onyxdatasystems.com/backend/api/v1/event_notinterested', id)}
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'notinterested' 
                ? 'bg-yellow-500 text-white' 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default EventCard;
=======
export default EventCard;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
