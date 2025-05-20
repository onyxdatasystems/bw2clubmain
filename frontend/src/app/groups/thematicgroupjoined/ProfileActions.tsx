<<<<<<< HEAD
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
=======
import React, { useState } from 'react';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import Image from 'next/image';

interface ProfileActionsProps {
  groupId: string;
  userId: string;
}

<<<<<<< HEAD
interface Friend {
  id: string;
  name: string;
  avatar: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ groupId, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/peopel/info/{id}${groupId}`
        );
        const data = await response.json();
        
        const member = data.members.find((m: any) => m.id === userId);
        if (member) {
          setIsMember(true);
          setIsAdmin(member.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking membership:', error);
      }
    };
    
    checkMembership();
  }, [groupId, userId]);

  const searchFriends = async (query: string) => {
    if (query.length < 3) {
      setFriends([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/search_friends_for_inviting?q=${query}`
      );
=======
const ProfileActions: React.FC<ProfileActionsProps> = ({ groupId, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<any[]>([]);

  const searchFriends = async (query: string) => {
    try {
      const response = await fetch(`https://bw2club.onyxdatasystems.com/backend/api/v1/search_friends_for_inviting?q=${query}`);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      const data = await response.json();
      setFriends(data.results);
    } catch (error) {
      console.error('Friend search failed:', error);
<<<<<<< HEAD
    } finally {
      setIsSearching(false);
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    }
  };

  const sendInvite = async (friendId: string) => {
    try {
<<<<<<< HEAD
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group_invition`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groupId, userId, friendId })
        }
      );
      
      if (response.ok) {
        setFriends(prev => prev.filter(friend => friend.id !== friendId));
      }
=======
      await fetch('https://bw2club.onyxdatasystems.com/backend/api/v1/group/invites/sent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId, userId, friendId })
      });
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    } catch (error) {
      console.error('Invite failed:', error);
    }
  };

<<<<<<< HEAD
  const handleJoinGroup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_join/${groupId}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        setIsMember(true);
      }
    } catch (error) {
      console.error('Join group failed:', error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_join_remove/${groupId}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        setIsMember(false);
      }
    } catch (error) {
      console.error('Leave group failed:', error);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow-sm">
      {!isMember ? (
        <motion.button
          onClick={handleJoinGroup}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Join Group
        </motion.button>
      ) : (
        <div className="flex space-x-2">
          <motion.button
            onClick={handleLeaveGroup}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Leave Group
          </motion.button>
          
          {isAdmin && (
            <motion.button
              onClick={() => setSearchQuery('')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Invite Members
            </motion.button>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search friends to invite..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchFriends(e.target.value);
              }}
            />
            {isSearching && (
              <div className="absolute right-3 top-2.5">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {friends.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
              >
                {friends.map(friend => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => sendInvite(friend.id)}
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="ml-2 text-sm">{friend.name}</span>
                    <div className="ml-auto text-xs text-purple-600">Invite</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default ProfileActions;