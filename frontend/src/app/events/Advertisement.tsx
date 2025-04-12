import React from 'react';
import Image from 'next/image';

interface AdvertisementProps {
  title?: string;
  imageUrl?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({
  title = 'Advertising',
  imageUrl = 'https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-11.png',
}) => {
  return (
    <div className="w-full max-w-[225px] h-auto bg-white rounded-lg p-4 shadow-md">
      <div className="border-b border-slate-300 pb-2">
        <h3 className="font-raleway font-bold text-sm text-black">{title}</h3>
      </div>
      <div className="mt-4">
        <div className="relative w-full h-[241px] rounded-[13px] overflow-hidden">
          <Image 
            src={imageUrl}
            alt="Advertisement"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;

