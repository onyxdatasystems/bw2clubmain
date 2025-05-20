import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  leftTitle?: string;
  rightTitle?: string;
  leftImageSrc?: string;
  rightImageSrc?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  leftTitle = 'HerPower',
  rightTitle = 'Sports',
  leftImageSrc = 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do.png',
  rightImageSrc = 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/arrow-do-2.png',
  onLeftClick,
  onRightClick,
}) => {
  return (
    <div className="w-full h-10 flex justify-between items-center px-4 bg-inherit md:hidden">
      {/* Left */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={onLeftClick}>
        <div className="w-10 h-10 flex items-center justify-center">
          <Image src={leftImageSrc} alt="Left" width={20} height={20} />
        </div>
        <span className="text-sm font-semibold text-[#141414]">{leftTitle}</span>
      </div>
      {/* Right */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={onRightClick}>
        <span className="text-sm font-semibold text-[#141414]">{rightTitle}</span>
        <div className="w-10 h-10 flex items-center justify-center">
          <Image src={rightImageSrc} alt="Right" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
