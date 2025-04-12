import React from 'react';
import Image from 'next/image';

interface HeaderSectionProps {
  title?: string;
  onClose?: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title = "Create Thematic Group",
  onClose = () => {},
}) => {
  return (
    <div className="flex justify-between items-center w-full p-4 border-b border-gray-200">
      <h1 className="text-[20px] font-inter font-medium leading-[140%] tracking-[-0.5px] text-[#292b32]">
        {title}
      </h1>
      <button 
        onClick={onClose}
        className="hover:opacity-80 transition-opacity"
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/x-1.png"
          alt="Close"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
};

export default HeaderSection;

