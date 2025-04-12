import React from 'react';
import Image from 'next/image';

interface ThematicGroup {
  id: string;
  title: string;
  admin: string;
  isPrivate: boolean;
  status: 'join' | 'view' | 'pending';
  avatar: string;
}

const defaultGroups: ThematicGroup[] = [
  {
    id: '1',
    title: 'ASTROLOGY WITH TALICNA',
    admin: 'Ksenija Nikolova',
    isPrivate: false,
    status: 'join',
    avatar: 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/3-d-avata.png'
  },
  {
    id: '2',
    title: "Wisdom Through Missteps: Women's Lessons",
    admin: 'Riste Gjorgjiev',
    isPrivate: true,
    status: 'join',
    avatar: 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/3-d-avata-2.png'
  },
  {
    id: '3',
    title: 'Моето искуство со мобингот на работно место',
    admin: 'Riste Gjorgjiev',
    isPrivate: false,
    status: 'view',
    avatar: 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/3-d-avata-4.png'
  },
  {
    id: '4', 
    title: 'Mental health',
    admin: 'Rozalija Sekuloska',
    isPrivate: true,
    status: 'pending',
    avatar: 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/3-d-avata-3.png'
  },
  {
    id: '5',
    title: "Imposter Syndrome (I think I'm not good enough)",
    admin: 'Ksenija Nikolova',
    isPrivate: false,
    status: 'join',
    avatar: 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/3-d-avata-5.png'
  }
];

interface Props {
  groups?: ThematicGroup[];
}

const ThematicGroupList: React.FC<Props> = ({ groups = defaultGroups }) => {
  return (
    <div className="w-full min-w-[790px] flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.id} className="w-full h-[110px] bg-white flex items-center p-4">
          <div className="h-[70px] w-[70px] relative">
            <Image
              src={group.avatar}
              alt={`${group.title} avatar`}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col ml-4 flex-grow">
            <h3 className="text-base font-medium leading-[140%] text-black">
              {group.title}
            </h3>
            <p className="text-sm text-[#757575] leading-[140%]">
              Admin: {group.admin}
            </p>
            <div className="flex items-center mt-2">
              <Image
                src={group.isPrivate ? 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/lock-pas.png' : 'https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/globe-1.png'}
                alt={group.isPrivate ? 'Private' : 'Public'}
                width={11}
                height={11}
              />
              <span className="text-xs text-[#757575] ml-1">
                {group.isPrivate ? 'Private Group' : 'Public Group'}
              </span>
            </div>
          </div>

          <button 
            className={`h-[28px] px-3 rounded-full border border-[#7171C1] text-[#7171C1] hover:bg-[#7171C1] hover:text-white transition-colors`}
          >
            {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThematicGroupList;

