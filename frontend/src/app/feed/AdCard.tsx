'use client'; // if needed

import React from 'react';
import Image from 'next/image';
import { Ad } from './store/types';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded shadow">
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        <h2 className="font-bold text-lg">{ad.title}</h2>

        {ad.image_url ? (
          <div className="relative mt-2 w-full h-48 rounded overflow-hidden">
            <Image
              src={ad.image_url}
              alt={ad.title}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        ) : ad.video_url ? (
          <video src={ad.video_url} controls className="mt-2 rounded w-full" />
        ) : (
          <p className="text-sm text-gray-500 mt-2">No media available</p>
        )}

        {ad.description && (
          <p className="text-sm text-gray-700 mt-2">{ad.description}</p>
        )}
      </a>
    </div>
  );
};

export default AdCard;
