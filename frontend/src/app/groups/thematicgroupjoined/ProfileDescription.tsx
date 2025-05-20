<<<<<<< HEAD
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProfileDescriptionProps {
  groupId: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ groupId }) => {
  const [description, setDescription] = useState('Loading description...');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_details/${groupId}`
        );
        const data = await response.json();
        setDescription(data.description || 'No description provided');
      } catch (error) {
        console.error('Error fetching description:', error);
        setDescription('Failed to load description');
      }
    };
    
    fetchDescription();
  }, [groupId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-row w-full p-4 bg-white rounded-lg shadow-sm"
    >
      <p className="text-gray-800 text-sm leading-[140%] tracking-[-0.41px] font-normal">
        {description}
      </p>
    </motion.div>
  );
};

export default ProfileDescription;
=======
import React from 'react';

interface ProfileDescriptionProps {
  description?: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
  description = "A community dedicated to communicating climate & justice. Another world is possible 🌏 Join us."
}) => {
  return (
    <div className="flex flex-row w-full min-w-[516px] p-4">
      <p className="text-[#292b32] text-sm leading-[140%] tracking-[-0.41px] font-normal">
        {description}
      </p>
    </div>
  );
};

export default ProfileDescription;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
