// components/InviteModal.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface InviteModalProps {
  eventId: string;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const InviteModal: React.FC<InviteModalProps> = ({ eventId, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  interface User {
    id: string;
    name: string;
  }

  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/search_user_for_event_inviting`,
        {
          params: { query: searchQuery },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleInvite = async (friendId: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/invites/sent`,
        {
          invited_friend_id: friendId,
          event_id: eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Invitation sent!');
    } catch (error) {
      console.error('Invitation failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Invite Friends</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Search
        </button>
        <ul>
          {searchResults.map((user) => (
            <li key={user.id} className="flex justify-between items-center mb-2">
              <span>{user.name}</span>
              <button
                onClick={() => handleInvite(user.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Invite
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
