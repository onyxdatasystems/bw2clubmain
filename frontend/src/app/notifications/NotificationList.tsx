// src/components/NotificationList.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

interface NotificationListProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface Notification {
  id: number;
  avatar: string;
  message: string;
  time: string;
}

export class NotificationList extends BaseComponent<NotificationListProps> {
  private notifications: Notification[] = [
    {
      id: 1,
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/avatar.png',
      message: 'Ksenija Nikolova buzzed you',
      time: '10mins ago'
    },
    {
      id: 2,
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/avatar-2.png',
      message: 'Ksenija Nikolova supported you back. You have formed a new support bond',
      time: '30mins ago'
    },
    {
      id: 3,
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z-qraHn5m-GBkPL5/avatar-3.png',
      message: 'Aisha Green posted on PLANNET SAVERS group',
      time: '30mins ago'
    }
  ];

  render() {
    const { className = '', size = 'lg' } = this.props;
    const responsiveClasses = this.getResponsiveClasses(size);

    return (
      <motion.div 
        className={`${className} ${responsiveClasses.container} mx-auto`}
        {...this.defaultAnimation}
      >
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
          {this.notifications.map((notification, index) => (
            <motion.div 
              key={notification.id}
              className="flex items-center w-full h-[93px] bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-200"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center pl-4">
                <motion.div 
                  className="relative w-[57px] h-[57px]"
                  whileHover={{ rotate: 5 }}
                >
                  <Image
                    src={notification.avatar}
                    alt="User avatar"
                    fill
                    className="rounded-full"
                  />
                </motion.div>
                <div className="flex flex-col ml-4 gap-1">
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
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
}