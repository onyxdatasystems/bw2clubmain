import React from 'react';
import Image from 'next/image';

const StatusBar: React.FC = () => {
  return (
    <div className="w-full h-[54px] flex justify-between items-center px-4 bg-inherit">
      <div className="flex items-center justify-center w-[140.5px] h-full">
        <span className="text-[17px] font-semibold text-[#141414] leading-[22px] font-['Inter']">
          9:41
        </span>
      </div>
      <div className="flex items-center justify-center w-[140.5px] h-full">
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/levels.png"
          alt="Status icons"
          width={140}
          height={54}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default StatusBar;

