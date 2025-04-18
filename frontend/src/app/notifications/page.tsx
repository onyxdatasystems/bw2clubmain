// Update the Layout component to handle authentication
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import { GetInvolvedSection } from './GetInvolvedSection';
import { NotificationList } from './NotificationList';
import { BrandAmbassadors } from './BrandAmbassadors';
import { PartnersSection } from './PartnersSection';
import { redirect } from 'next/navigation';

export default class Layout extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      redirect('/login');
    }
  }

  render() {
    return (
      <motion.div 
        className="flex flex-col h-auto w-full bg-gradient-to-b from-white to-[#f6f6f6] min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <div className="flex flex-col md:flex-row flex-grow">
          <SideBar className="flex-none w-64" />
          <motion.div 
            className="flex flex-col flex-grow p-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GetInvolvedSection className="flex-none w-full" />
            <NotificationList className="flex-none w-full" />
            <BrandAmbassadors className="flex-none w-full" />
            <PartnersSection className="flex-none w-full" />
          </motion.div>
        </div>
      </motion.div>
    );
  }
}