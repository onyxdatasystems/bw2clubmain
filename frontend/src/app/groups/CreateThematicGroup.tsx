import React from 'react';
import Image from 'next/image';

const CreateThematicGroup: React.FC = () => {
  return (
    <div className="w-full max-w-[790px] h-auto bg-white flex items-center p-4 gap-4 rounded-lg shadow-md">
      <div className="w-[70px] h-[70px] relative flex-shrink-0">
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/generic.png"
          alt="Generic avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>
      
      <h2 className="text-xl font-medium text-black leading-[140%] flex-grow">
        Create Thematic Group
      </h2>
      
      <button 
        className="px-4 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
        onClick={() => {}}
      >
        Create
      </button>
    </div>
  );
};

export default CreateThematicGroup;

