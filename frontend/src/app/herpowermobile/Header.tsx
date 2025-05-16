import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  leftTitle?: string;
  rightTitle?: string;
  leftImageSrc?: string;
  rightImageSrc?: string;
}

const Header: React.FC<HeaderProps> = ({
  leftTitle = 'HerPower',
  rightTitle = 'Sports',
  leftImageSrc = 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do.png',
  rightImageSrc = 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do-2.png',
}) => {
  return (
    <div className="w-full h-10 flex justify-between items-center px-4 bg-inherit">
      {/* Left section */}
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image 
            src={leftImageSrc}
            alt="Back arrow"
            width={20}
            height={20}
          />
        </div>
        <span className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
          {leftTitle}
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
        <span className="text-[14px] font-semibold tracking-[-0.5px] text-[#141414]">
          {rightTitle}
        </span>
        <div className="w-10 h-10 flex items-center justify-center">
          <Image 
            src={rightImageSrc}
            alt="Down arrow"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

