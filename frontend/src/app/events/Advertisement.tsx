<<<<<<< HEAD
// components/Advertisement.tsx
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React from 'react';
import Image from 'next/image';

interface AdvertisementProps {
  title?: string;
  imageUrl?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({
  title = 'Advertising',
<<<<<<< HEAD
  imageUrl = '/images/advertisement.png',
}) => {
  return (
    <div className="w-full sm:max-w-[225px] h-auto bg-white rounded-lg p-4 shadow-md">
=======
  imageUrl = 'https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-11.png',
}) => {
  return (
    <div className="w-full max-w-[225px] h-auto bg-white rounded-lg p-4 shadow-md">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      <div className="border-b border-slate-300 pb-2">
        <h3 className="font-raleway font-bold text-sm text-black">{title}</h3>
      </div>
      <div className="mt-4">
        <div className="relative w-full h-[241px] rounded-[13px] overflow-hidden">
<<<<<<< HEAD
          <Image src={imageUrl} alt="Advertisement" fill className="object-cover" />
=======
          <Image 
            src={imageUrl}
            alt="Advertisement"
            fill
            className="object-cover"
          />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
<<<<<<< HEAD
=======

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
