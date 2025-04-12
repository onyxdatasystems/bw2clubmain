import React from 'react';
import Image from 'next/image';

interface ProfileActionsProps {
  userName?: string;
  userAvatar?: string;
  isVerified?: boolean;
  requestStatus?: 'pending' | 'approved' | 'rejected';
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  userName = 'Alfredo Donin',
  userAvatar = 'https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/avatar.png',
  isVerified = true,
  requestStatus = 'pending'
}) => {
  return (
    <div className="flex flex-col w-full min-w-[548px] p-4 bg-white">
      <button 
        className="w-full max-w-[516px] h-[40px] px-4 py-2 rounded-full border border-purple-500 text-purple-500 
        hover:bg-purple-50 transition-colors duration-200 font-medium text-sm tracking-tight"
      >
        Request Pending
      </button>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-10 h-10">
            <Image
              src={userAvatar}
              alt={userName}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="ml-2 text-[14px] text-[#292B32] tracking-tight">{userName}</span>
        </div>
        {isVerified && (
          <div className="flex gap-2">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/tick-cir.png"
              alt="Verified"
              width={21}
              height={21}
            />
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/frame-48.png"
              alt="Frame"
              width={22}
              height={22}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileActions;

