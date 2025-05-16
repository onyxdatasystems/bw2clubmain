import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileActionsProps {
  groupId: string;
  userId: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ groupId, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<any[]>([]);

  const searchFriends = async (query: string) => {
    try {
      const response = await fetch(`https://bw2club.onyxdatasystems.com/backend/api/v1/search_friends_for_inviting?q=${query}`);
      const data = await response.json();
      setFriends(data.results);
    } catch (error) {
      console.error('Friend search failed:', error);
    }
  };

  const sendInvite = async (friendId: string) => {
    try {
      await fetch('https://bw2club.onyxdatasystems.com/backend/api/v1/group/invites/sent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId, userId, friendId })
      });
    } catch (error) {
      console.error('Invite failed:', error);
    }
  };

  return (
    <div className="flex flex-col w-full min-w-[548px] p-4 bg-white">
      <div className="relative">
        <input
          type="text"
          placeholder="Search friends to invite..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length > 2) searchFriends(e.target.value);
          }}
        />
        
        {friends.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
            {friends.map(friend => (
              <div 
                key={friend.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => sendInvite(friend.id)}
              >
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="ml-2">{friend.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing profile action buttons */}
    </div>
  );
};

export default ProfileActions;