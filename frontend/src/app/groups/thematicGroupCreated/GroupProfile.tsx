import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GroupProfileProps {
  groupId: string;
}

interface GroupData {
  coverPhoto: string;
  status: string;
  title: string;
  isPrivate: boolean;
  postsCount: number;
  membersCount: number;
  description: string;
  // Add other needed properties
}

const GroupProfile: React.FC<GroupProfileProps> = ({ groupId }) => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const [detailsRes, peopleRes] = await Promise.all([
          fetch(`https://bw2club.onyxdatasystems.com/backend/api/v1/group/view/details/${groupId}`),
          fetch(`https://bw2club.onyxdatasystems.com/backend/api/v1/group/people/info/${groupId}`) // Fixed typo in "people"
        ]);
        
        if (!detailsRes.ok || !peopleRes.ok) throw new Error('Failed to load group data');
        
        const details = await detailsRes.json();
        const people = await peopleRes.json();
        
        setGroupData({ ...details, ...people });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load group data');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const updateCoverPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append('cover', file);
    
    try {
      const response = await fetch(`https://bw2club.onyxdatasystems.com/backend/api/v1/update/coverphoto/group/${groupId}`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const { coverUrl } = await response.json();
        setGroupData(prev => prev ? { ...prev, coverPhoto: coverUrl } : null);
      }
    } catch (err) {
      console.error('Cover photo update failed:', err);
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) updateCoverPhoto(file);
    };
    input.click();
  };

  if (loading) return <div>Loading group profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!groupData) return <div>No group data found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="relative">
        <Image
          src={groupData.coverPhoto || '/default-cover.jpg'}
          alt="Group Cover"
          width={600}
          height={200}
          className="rounded-t-lg object-cover"
          priority
        />
        <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded">
          {groupData.status}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{groupData.title}</h2>
        <p className="text-sm text-gray-500">
          {groupData.isPrivate ? '🔒 Private Group' : '🌍 Public Group'}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-sm mr-4">{groupData.postsCount} posts</span>
          <span className="text-sm">{groupData.membersCount} members</span>
        </div>
        <p className="mt-2 text-sm">{groupData.description}</p>
        <button 
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={handleFileUpload}
        >
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default GroupProfile;