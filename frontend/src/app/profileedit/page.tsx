"use client "
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  UserProfileEditBio from "./UserProfileEditBio";
 import UserProfileEditWork from "./UserProfileEditWork";
  import UserProfileEditEdu from "./UserProfileEditEdu"; 
  import UserProfileEditSkills from "./UserProfileEditSkills";
  import  UserProfileCompanyOverview from './UserProfileCompanyOverview';
import Image from 'next/image';

class ProfileEditLayout extends React.Component {
  state = {
    activeTab: 'bio',
    showModal: false,
    modalContent: null
  };

  tabs = [
    { id: 'bio', label: 'Basic Info' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'company', label: 'Company' }
  ];

  openModal = (content: React.ReactNode) => {
    this.setState({ showModal: true, modalContent: content });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalContent: null });
  };

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-v4cQz4-w8v6R3Z/avatar.png" 
                alt="Avatar" 
                width={115} 
                height={115}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Profile</h1>
              <p className="text-gray-600">Update your personal and professional information</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <div className="flex space-x-2">
              {this.tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => this.setState({ activeTab: tab.id })}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    this.state.activeTab === tab.id 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={this.state.activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {this.state.activeTab === 'bio' && (
              <UserProfileEditBio 
                onEditComplete={() => this.openModal(<UserProfileEditBio />)}
              />
            )}
            {this.state.activeTab === 'work' && (
              <UserProfileEditWork 
                onEditComplete={() => this.openModal(<UserProfileEditWork />)}
              />
            )}
            {this.state.activeTab === 'education' && (
              <UserProfileEditEdu 
                onEditComplete={() => this.openModal(<UserProfileEditEdu />)}
              />
            )}
            {this.state.activeTab === 'skills' && (
              <UserProfileEditSkills 
                onEditComplete={() => this.openModal(<UserProfileEditSkills />)}
              />
            )}
            {this.state.activeTab === 'company' && (
              <UserProfileCompanyOverview 
                onEditComplete={() => this.openModal(<UserProfileCompanyOverview />)}
              />
            )}
          </motion.div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {this.state.showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={this.closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {this.state.modalContent}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default ProfileEditLayout;