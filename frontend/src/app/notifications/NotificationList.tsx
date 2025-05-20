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
<<<<<<< HEAD
  group_id?: number;
  event_id?: number;
  fundraiser_id?: number;
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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
      
<<<<<<< HEAD
      if (!response.ok) throw new Error('Failed to fetch notifications');
=======
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      
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

<<<<<<< HEAD
  handleAction = async (notificationId: number, action: 'accept' | 'decline') => {
    try {
      const notification = this.state.notifications.find(n => n.id === notificationId);
      if (!notification) throw new Error('Notification not found');

      let url = '';
      switch (notification.type) {
        case 'friend_request':
          url = `/api/${action}_friend_notification/${notificationId}`;
          break;
        case 'group_invite':
          if (!notification.group_id) throw new Error('Missing group ID');
          url = `/api/${action}_group_notification/${notificationId}/${notification.group_id}`;
          break;
        case 'event_invite':
          if (!notification.event_id) throw new Error('Missing event ID');
          url = `/api/${action}_event_notification/${notificationId}/${notification.event_id}`;
          break;
        case 'fundraiser_invite':
          if (!notification.fundraiser_id) throw new Error('Missing fundraiser ID');
          url = `/api/${action}_fundraiser_notification/${notificationId}/${notification.fundraiser_id}`;
          break;
        default:
          throw new Error('Unsupported notification type');
      }

      const response = await fetch(url, {
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
<<<<<<< HEAD

      if (!response.ok) throw new Error(`Failed to ${action} notification`);
      await this.fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  markAsRead = async (notificationId: number) => {
    try {
      await fetch(`/api/mark_as_read/${notificationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      await this.fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  renderNotificationActions = (notification: Notification) => {
    const actionTypes = ['friend_request', 'group_invite', 'event_invite', 'fundraiser_invite'];
    
    if (!actionTypes.includes(notification.type)) return null;

    return (
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
    );
  };

=======
      
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

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  render() {
    const { className = '', size = 'lg' } = this.props;
    const { notifications, loading, error } = this.state;
    const responsiveClasses = this.getResponsiveClasses(size);

<<<<<<< HEAD
    if (loading) return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

    if (error) return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

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
<<<<<<< HEAD
              onClick={() => this.markAsRead(notification.id)}
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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
                
<<<<<<< HEAD
                {this.renderNotificationActions(notification)}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
}