'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setCurrentTime(time);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[54px] flex justify-between items-center px-4 bg-inherit md:hidden">
      <div className="flex items-center justify-center w-[140px] h-full">
        <span className="text-lg font-semibold text-[#141414]">{currentTime}</span>
      </div>
      <div className="flex items-center justify-center w-[140px] h-full">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/levels.png"
          alt="status"
          width={140}
          height={54}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default StatusBar;
