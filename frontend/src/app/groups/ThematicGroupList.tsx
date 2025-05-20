<<<<<<< HEAD
"use client"
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ThematicGroup {
  id: string;
  title: string;
  admin: string;
  isPrivate: boolean;
  status: 'join' | 'view' | 'pending';
  avatar: string;
  membersCount: number;
  postsCount: number;
}

const ThematicGroupList: React.FC = () => {
  const [groups, setGroups] = useState<ThematicGroup[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialGroups = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/all/view`
      );
=======
      const response = await fetch('/api/group/all/view');
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error loading groups:', error);
    }
  };

<<<<<<< HEAD
  const loadMoreGroups = React.useCallback(async () => {
=======
  const loadMoreGroups = async () => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    if (!hasMore || loading) return;
    setLoading(true);
    
    try {
<<<<<<< HEAD
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/load_groups_by_scrolling?page=${page}`
      );
=======
      const response = await fetch(`/api/load_groups_by_scrolling?page=${page}`);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      const newGroups = await response.json();
      
      if (newGroups.length === 0) {
        setHasMore(false);
        return;
      }
      
      setGroups(prev => [...prev, ...newGroups]);
      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [hasMore, loading, page]);
=======
  };
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

  const handleGroupAction = async (groupId: string, action: 'join' | 'leave') => {
    try {
      const endpoint = action === 'join' 
<<<<<<< HEAD
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/join/${groupId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/rjoin/${groupId}`;
=======
        ? `/api/group/join/${groupId}`
        : `/api/group/rjoin/${groupId}`;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

      const response = await fetch(endpoint, { method: 'GET' });
      
      if (response.ok) {
        setGroups(prev => prev.map(group => 
          group.id === groupId ? { ...group, status: action === 'join' ? 'pending' : 'join' } : group
        ));
      }
    } catch (error) {
      console.error('Group action failed:', error);
    }
  };

  useEffect(() => {
    loadInitialGroups();
<<<<<<< HEAD
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== 
        document.documentElement.offsetHeight) return;
      loadMoreGroups();
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreGroups]);

  return (
    <div className="w-full flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.id} className="w-full bg-white flex items-center p-4 rounded-lg shadow-sm">
          <div className="h-[70px] w-[70px] relative flex-shrink-0">
=======
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== 
      document.documentElement.offsetHeight) return;
    loadMoreGroups();
  };

  return (
    <div className="w-full min-w-[790px] flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.id} className="w-full h-[110px] bg-white flex items-center p-4">
          <div className="h-[70px] w-[70px] relative">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            <Image
              src={group.avatar}
              alt={group.title}
              fill
<<<<<<< HEAD
              className="object-cover rounded-lg"
=======
              className="object-cover"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </div>
          
          <div className="flex flex-col ml-4 flex-grow">
            <h3 className="text-base font-medium text-black">{group.title}</h3>
            <p className="text-sm text-[#757575]">Admin: {group.admin}</p>
            <div className="flex items-center mt-2">
              <Image
                src={group.isPrivate ? 'lock-icon.png' : 'globe-icon.png'}
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
            onClick={() => handleGroupAction(group.id, group.status === 'join' ? 'join' : 'leave')}
            className={`h-[28px] px-3 rounded-full border ${
              group.status === 'pending' 
                ? 'border-gray-400 text-gray-400' 
                : 'border-[#7171C1] text-[#7171C1] hover:bg-[#7171C1] hover:text-white'
            } transition-colors`}
            disabled={group.status === 'pending'}
          >
            {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
          </button>
        </div>
      ))}
      {loading && <div className="text-center py-4">Loading more groups...</div>}
    </div>
  );
};

export default ThematicGroupList;