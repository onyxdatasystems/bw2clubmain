// src/components/NotificationList.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

interface Notification {
  id: number;
  avatar: string;
  message: string;
  time: string;
  type: string;
  read_at: string | null;
}

interface NotificationListProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface NotificationListState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

export class NotificationList extends BaseComponent<NotificationListProps, NotificationListState> {
  constructor(props: NotificationListProps) {
    super(props);
    this.state = {
      notifications: [],
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    await this.fetchNotifications();
  }

  fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      this.setState({ 
        notifications: data.notifications,
        loading: false 
      });
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  };

  handleAction = async (notificationId: number, action: string) => {
    try {
      const endpointMap: Record<string, string> = {
        'friend_request': 'friend',
        'group_invite': 'group',
        'event_invite': 'event',
        'fundraiser_invite': 'fundraiser'
      };
      
      const type = endpointMap[this.state.notifications.find(n => n.id === notificationId)?.type || ''];
      
      const response = await fetch(`/api/notifications/${action}-${type}/${notificationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} notification`);
      }
      
      // Refresh notifications after action
      await this.fetchNotifications();
    } catch (error) {
      console.error(error);
      // Handle error (show toast, etc.)
    }
  };

  render() {
    const { className = '', size = 'lg' } = this.props;
    const { notifications, loading, error } = this.state;
    const responsiveClasses = this.getResponsiveClasses(size);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      );
    }

    return (
      <motion.div 
        className={`${className} ${responsiveClasses.container} mx-auto`}
        {...this.defaultAnimation}
      >
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
          {notifications.map((notification) => (
            <motion.div 
              key={notification.id}
              className={`flex items-center w-full h-[93px] hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-200 ${
                notification.read_at ? 'bg-white' : 'bg-blue-50'
              }`}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center pl-4 w-full">
                <motion.div 
                  className="relative w-[57px] h-[57px]"
                  whileHover={{ rotate: 5 }}
                >
                  <Image
                    src={notification.avatar}
                    alt="User avatar"
                    fill
                    className="rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                </motion.div>
                
                <div className="flex flex-col ml-4 gap-1 flex-grow">
                  <motion.span 
                    className="text-sm text-black tracking-[-0.41px] leading-[140%]"
                    whileHover={{ color: "#7171c1" }}
                  >
                    {notification.message}
                  </motion.span>
                  <span className="text-sm text-[#757575] leading-5">
                    {notification.time}
                  </span>
                </div>
                
                {notification.type === 'friend_request' && (
                  <div className="flex space-x-2 pr-4">
                    <motion.button
                      className="px-3 py-1 bg-green-500 text-white rounded-full text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleAction(notification.id, 'accept');
                      }}
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      className="px-3 py-1 bg-red-500 text-white rounded-full text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleAction(notification.id, 'decline');
                      }}
                    >
                      Decline
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
}